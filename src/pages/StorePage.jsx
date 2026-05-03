import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getStoreBySlug } from '../services/storeService';
import { formatWAOrderMessage, getWAUrl } from '../utils/whatsapp';
import { logOrder } from '../services/orderService';
import { Helmet } from 'react-helmet-async';
import { ShoppingBag, Share2, Search } from 'lucide-react';
import StoreBanner from '../components/store/StoreBanner';
import PublicProductCard from '../components/store/PublicProductCard';
import StoreQRCode from '../components/store/StoreQRCode';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageWrapper from '../components/layout/PageWrapper';
import useHaptics from '../hooks/useHaptics';
import toast from 'react-hot-toast';

export default function StorePage() {
  const { storeSlug } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const haptics = useHaptics();

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      setLoading(true);
      try {
        const storeData = await getStoreBySlug(storeSlug);
        if (!storeData) {
          navigate('/404');
          return;
        }
        setStore(storeData);

        await updateDoc(doc(db, "users", storeData.id), { view_count: increment(1) });

        const q = query(collection(db, "products"), where("user_id", "==", storeData.id));
        const querySnapshot = await getDocs(q);
        const prods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(prods);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load store");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreAndProducts();
  }, [storeSlug, navigate]);

  const handleOrder = async (product) => {
    haptics.medium();
    try {
      await logOrder({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image_url,
        seller_id: store.id,
        seller_phone: store.phone,
        currency: product.currency || '₦',
        store_name: store.store_name
      });
      await updateDoc(doc(db, "products", product.id), { order_count: increment(1) });
      window.open(getWAUrl(store.phone, formatWAOrderMessage(product, product.currency || '₦')), '_blank');
      toast.success("Opening WhatsApp...");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] flex flex-col items-center pb-20 grain-overlay">
      <Helmet>
        <title>{store.store_display_name} | WhatsApp Store</title>
      </Helmet>

      <div className="w-full max-w-lg bg-white dark:bg-slate-900 min-h-screen shadow-2xl relative flex flex-col border-x border-[var(--border-default)]">
        <StoreBanner 
          store={store} 
          productCount={products.length} 
          onShare={() => setIsShareModalOpen(true)}
        />

        <div className="p-6 flex-1">
          <div className="sticky top-4 z-30 mb-8">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
              <input 
                type="text"
                placeholder="Search catalog..."
                className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-[var(--border-default)] rounded-full py-4 pl-14 pr-6 text-sm font-black outline-none focus:border-[var(--brand-primary)]"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredProducts.map(product => (
              <PublicProductCard key={product.id} product={product} onOrder={handleOrder} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 text-[var(--text-muted)]">No products found</div>
          )}
        </div>
      </div>

      <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Store QR Code">
        <StoreQRCode storeSlug={store.store_name} storeName={store.store_display_name} />
      </Modal>
    </div>
  );
}
