import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getStoreBySlug } from '../services/storeService';
import { formatCartMessage, getWAUrl } from '../utils/whatsapp';
import { logOrder } from '../services/orderService';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import StoreBanner from '../components/store/StoreBanner';
import PublicProductCard from '../components/store/PublicProductCard';
import StoreQRCode from '../components/store/StoreQRCode';
import FloatingCartButton from '../components/store/FloatingCartButton';
import CartModal from '../components/store/CartModal';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function StorePage() {
  const { storeSlug } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

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

  const handleSingleOrder = async (product) => {
    try {
      const sellerPhone = store.phone || store.phoneNumber || store.whatsapp_number;
      if (!sellerPhone) {
        toast.error("Store phone number not found");
        return;
      }

      await logOrder({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image_url,
        seller_id: store.id,
        seller_phone: sellerPhone,
        currency: product.currency || '₦',
        store_name: store.store_name
      });
      await updateDoc(doc(db, "products", product.id), { order_count: increment(1) });

      const message = `Hello! I'd like to order *${product.name}* - ${product.currency || '₦'}${product.price}. Please confirm availability!`;
      const waUrl = getWAUrl(sellerPhone, message);
      window.open(waUrl, '_blank');
      toast.success("Opening WhatsApp...");
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Failed to place order");
    }
  };

  const handleCartCheckout = async () => {
    try {
      const sellerPhone = store.phone || store.phoneNumber || store.whatsapp_number;
      if (!sellerPhone) {
        toast.error("Store phone number not found");
        setIsCartModalOpen(false);
        return;
      }

      // Log orders for each item
      for (const item of cartItems) {
        await logOrder({
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          product_image: item.image_url,
          seller_id: store.id,
          seller_phone: sellerPhone,
          currency: item.currency || '₦',
          store_name: store.store_name,
          quantity: item.quantity
        });
        await updateDoc(doc(db, "products", item.id), { 
          order_count: increment(item.quantity) 
        });
      }

      // Generate WhatsApp message with all items
      const message = formatCartMessage(cartItems, cartItems[0]?.currency || '₦', store.store_display_name);
      const waUrl = getWAUrl(sellerPhone, message);
      
      // Clear cart and open WhatsApp
      clearCart();
      setIsCartModalOpen(false);
      window.open(waUrl, '_blank');
      toast.success("Opening WhatsApp with your order...");
    } catch (err) {
      console.error("Cart checkout error:", err);
      toast.error("Failed to process order");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
              <PublicProductCard key={product.id} product={product} onOrder={handleSingleOrder} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 text-[var(--text-muted)]">No products found</div>
          )}
        </div>

        {/* Floating Cart Button */}
        <FloatingCartButton onClick={() => setIsCartModalOpen(true)} />
      </div>

      {/* Share Modal */}
      <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Store QR Code">
        <StoreQRCode storeSlug={store.store_name} storeName={store.store_display_name} />
      </Modal>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onCheckout={handleCartCheckout}
        storeName={store.store_display_name}
      />
    </div>
  );
}
