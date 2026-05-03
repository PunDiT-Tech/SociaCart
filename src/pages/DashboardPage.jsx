import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Share2, Search, Trophy, Package, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import useProducts from '../hooks/useProducts';
import useOrders from '../hooks/useOrders';
import { deleteProduct, updateProduct } from '../services/productService';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import ProductCard from '../components/store/ProductCard';
import StoreQRCode from '../components/store/StoreQRCode';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { userProfile } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const { orders } = useOrders();
  const [searchQuery, setSearchSearchQuery] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topProduct = [...products].sort((a, b) => (b.order_count || 0) - (a.order_count || 0))[0];

  const handleDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id, productToDelete.image_url);
      toast.success("Product removed");
      setProductToDelete(null);
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleAvailability = async (product) => {
    try {
      await updateProduct(product.id, { is_available: !product.is_available });
      toast.success(product.is_available ? "Marked as out of stock" : "Marked as available");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <AppShell>
      <TopBar 
        title="Dashboard" 
        showBack={false}
        actions={
          <button 
            onClick={() => setIsQRModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-[var(--radius-md)]"
          >
            <Share2 size={20} />
          </button>
        }
      />

      <PageWrapper>
        <div className="mb-8 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] p-5 shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">SociaCart</div>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Store dashboard
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            Manage your catalog, track orders, and share your storefront from one place.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--surface-card)] p-5 rounded-[var(--radius-lg)] border border-[var(--border-default)] relative overflow-hidden"
          >
            <div className="relative z-10">
              <Package size={20} className="text-[var(--text-muted)] mb-3" />
              <div className="text-2xl font-mono font-extrabold">{products.length}</div>
              <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Products</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--surface-card)] p-5 rounded-[var(--radius-lg)] border border-[var(--border-default)] relative overflow-hidden"
          >
            <div className="relative z-10">
              <ShoppingCart size={20} className="text-[var(--text-muted)] mb-3" />
              <div className="text-2xl font-mono font-extrabold">{orders.length}</div>
              <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Orders</div>
            </div>
          </motion.div>
        </div>

        {/* Top Product Highlight */}
        {topProduct && topProduct.order_count > 0 && (
          <div className="mb-8 bg-hero rounded-[var(--radius-lg)] p-4 text-white flex items-center gap-4 shadow-glow-green">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Trophy size={24} className="text-[var(--brand-gold)]" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Best Seller</div>
              <div className="font-bold truncate">{topProduct.name}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-mono font-black">{topProduct.order_count}</div>
              <div className="text-[8px] font-bold uppercase opacity-70 whitespace-nowrap">Orders</div>
            </div>
          </div>
        )}

        {/* Search and Products */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text"
              placeholder="Search your catalog..."
              className="w-full bg-[var(--surface-card)] border border-[var(--border-default)] rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:border-[var(--brand-primary)] transition-all"
              value={searchQuery}
              onChange={e => setSearchSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {productsLoading ? (
              [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
            ) : products.length === 0 ? (
              <div className="col-span-2">
                <EmptyState 
                  title="No products yet"
                  description="Add your first item to start selling on WhatsApp."
                  icon={Package}
                  action={
                    <Button onClick={() => navigate('/add-product')} className="gap-2">
                      <Plus size={18} /> Add Product
                    </Button>
                  }
                />
              </div>
            ) : (
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <ProductCard 
                      product={product} 
                      onEdit={() => navigate(`/edit-product/${product.id}`)}
                      onDelete={() => setProductToDelete(product)}
                      onToggleAvailability={toggleAvailability}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* FAB */}
        {!productsLoading && products.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            onClick={() => navigate('/add-product')}
            className="fixed bottom-28 right-6 w-14 h-14 bg-[var(--brand-primary)] text-white rounded-full shadow-glow-green flex items-center justify-center z-40"
          >
            <Plus size={28} strokeWidth={3} />
          </motion.button>
        )}

        <Modal 
          isOpen={isQRModalOpen} 
          onClose={() => setIsQRModalOpen(false)} 
          title="Share Your Store"
        >
          <StoreQRCode 
            storeSlug={userProfile?.store_name} 
            storeName={userProfile?.store_display_name} 
          />
        </Modal>

        <ConfirmDialog 
          isOpen={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={handleDelete}
          title="Delete Product?"
          message={`Are you sure you want to remove "${productToDelete?.name}"? This action cannot be undone.`}
          loading={isDeleting}
        />
      </PageWrapper>
    </AppShell>
  );
}
