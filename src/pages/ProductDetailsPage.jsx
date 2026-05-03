import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../services/firebase';
import { formatWAOrderMessage, getWAUrl } from '../utils/whatsapp';
import { logOrder } from '../services/orderService';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ChevronLeft, Info } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatPrice } from '../utils/formatters';
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
  const { storeSlug, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const prodSnap = await getDoc(doc(db, "products", productId));
        if (!prodSnap.exists()) return navigate('/404');
        const prodData = { id: prodSnap.id, ...prodSnap.data() };
        setProduct(prodData);

        const storeSnap = await getDoc(doc(db, "users", prodData.user_id));
        setStore(storeSnap.data());
        
        await updateDoc(doc(db, "products", productId), { view_count: increment(1) });
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [productId, navigate]);

  const handleOrder = async () => {
    try {
      await logOrder({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image_url,
        seller_id: product.user_id,
        seller_phone: store.phone,
        currency: product.currency || '₦',
        store_name: store.store_name
      });
      await updateDoc(doc(db, "products", product.id), { order_count: increment(1) });
      window.open(getWAUrl(store.phone, formatWAOrderMessage(product, product.currency || '₦')), '_blank');
    } catch (err) {
      toast.error("Order failed");
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-[var(--surface-bg)] flex flex-col items-center grain-overlay">
      <Helmet>
        <title>{product.name} | {store.store_display_name}</title>
      </Helmet>

      <div className="w-full max-w-lg bg-white dark:bg-slate-900 min-h-screen shadow-2xl relative flex flex-col border-x border-[var(--border-default)]">
        <div className="absolute top-4 left-4 z-40">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center">
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="aspect-square w-full overflow-hidden bg-slate-100">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="font-display text-3xl font-black tracking-tight mb-1">{product.name}</h1>
            </div>
            <div className="text-2xl font-mono font-black text-[var(--brand-primary-dark)]">
              {formatPrice(product.price, product.currency)}
            </div>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 font-medium">
            {product.description || "Premium quality item available for instant order."}
          </p>

          <div className="mt-auto pt-8">
            <Button 
              size="lg" 
              className="w-full py-5 rounded-2xl gap-3 shadow-glow-green" 
              disabled={!product.is_available}
              onClick={handleOrder}
            >
              <ShoppingCart size={20} />
              <span className="font-black uppercase tracking-widest text-sm">Order on WhatsApp</span>
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              <Info size={12} />
              <span>Secure checkout via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
