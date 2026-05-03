import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addProduct, uploadProductImage } from '../services/productService';
import useProducts from '../hooks/useProducts';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import ProductForm from '../components/store/ProductForm';
import Button from '../components/ui/Button';
import { Crown, AlertCircle, Link } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user, userProfile } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();

  const isBasic = userProfile?.plan === 'basic' || !userProfile?.plan;
  const isAtLimit = isBasic && products.length >= 5;

  const handleSubmit = async (formData, imageFile) => {
    if (isAtLimit) {
      return toast.error("Basic plan limit reached (5 products)");
    }
    
    if (!imageFile) return toast.error("Please upload an image");
    
    setLoading(true);
    try {
      const imageUrl = await uploadProductImage(user.uid, imageFile);
      setProgress(100);

      await addProduct({
        ...formData,
        user_id: user.uid,
        image_url: imageUrl,
        order_count: 0,
        view_count: 0
      });

      toast.success("Product added successfully!");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell showNav={false}>
      <TopBar title="Add Product" />
      <PageWrapper>
        {isAtLimit ? (
          <div className="bg-white dark:bg-slate-900 rounded-[var(--radius-xl)] p-8 text-center border-2 border-dashed border-[var(--border-default)]">
            <div className="w-20 h-20 bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown size={40} />
            </div>
            <h2 className="font-display text-2xl font-black mb-3">Limit Reached!</h2>
            <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed px-4">
              Your <strong>Basic Plan</strong> is limited to 5 products. Upgrade to **Pro** for unlimited items and custom branding.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/pricing" className="w-full">
                <Button variant="primary" className="w-full gap-2 py-4">
                  <Crown size={18} /> Upgrade to Pro
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] border border-[var(--border-default)] p-6 shadow-sm">
            {isBasic && (
              <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <AlertCircle size={16} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {5 - products.length} slots remaining on Basic Plan
                </span>
              </div>
            )}
            <ProductForm 
              onSubmit={handleSubmit} 
              loading={loading}
              uploadProgress={progress}
            />
          </div>
        )}
      </PageWrapper>
    </AppShell>
  );
}
