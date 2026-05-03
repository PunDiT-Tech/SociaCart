import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, TrendingUp, Users, Eye, Check, ShoppingBag, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import toast from 'react-hot-toast';

export default function AdsPage() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [adType, setAdType] = useState('store'); // 'store' or 'product'
  const [formData, setFormData] = useState({
    store_name: userProfile?.store_display_name || '',
    product_id: '',
    product_name: '',
    product_image: '',
    description: '',
    duration: 7,
    amount: 0
  });

  // Load user's products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("user_id", "==", user.uid));
        const snapshot = await getDocs(q);
        const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(prods);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    loadProducts();
  }, [user.uid]);

  const adPackages = [
    { days: 3, price: 3000, popular: false, label: 'Starter' },
    { days: 7, price: 5000, popular: true, label: 'Standard' },
    { days: 14, price: 8000, popular: false, label: 'Premium' },
    { days: 30, price: 12000, popular: false, label: 'Enterprise' },
  ];

  const handleSelectPackage = (pkg) => {
    setFormData({ ...formData, duration: pkg.days, amount: pkg.price });
  };

  const handleSelectProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    setFormData({ 
      ...formData, 
      product_id: productId,
      product_name: product?.name || '',
      product_image: product?.image_url || ''
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!userProfile?.store_display_name) {
      return toast.error("Please create your store first before advertising");
    }
    if (!formData.description || formData.description.length < 10) {
      return toast.error("Please enter a description (at least 10 characters)");
    }
    if (formData.amount <= 0) {
      return toast.error("Please select a package");
    }
    if (adType === 'product' && !formData.product_id) {
      return toast.error("Please select a product to promote");
    }

    setLoading(true);
    try {
      const adData = {
        user_id: user.uid,
        store_id: user.uid,
        store_name: userProfile.store_display_name,
        ad_type: adType,
        product_id: formData.product_id || null,
        product_name: formData.product_name || null,
        product_image: formData.product_image || null,
        description: formData.description,
        duration: formData.duration,
        amount: formData.amount,
        status: 'pending',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
        ends_at: new Date(Date.now() + formData.duration * 24 * 60 * 60 * 1000).toISOString()
      };

      console.log("Submitting ad:", adData);
      await addDoc(collection(db, "ads"), adData);

      // Open WhatsApp for payment
      const adminPhone = "2348067369016";
      const adDetails = adType === 'product'
        ? `Product: ${formData.product_name}\nStore: ${userProfile.store_display_name}`
        : `Store: ${userProfile.store_display_name}`;
      
      const message = `Hello! I want to purchase an advertisement.

*Ad Details:*
- Type: ${adType === 'product' ? '🛍️ Product Promotion' : '🏪 Store Feature'}
${adDetails}
- Duration: ${formData.duration} days
- Amount: ₦${formData.amount.toLocaleString()}
- Description: ${formData.description}

Please provide payment details to activate my ad. Thank you!`;

      const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      toast.success("Ad submitted! Complete payment on WhatsApp.");
      navigate('/');
    } catch (err) {
      console.error("Ad submission error:", err);
      const errorMessage = err.message || "Failed to submit ad";
      toast.error(`${errorMessage}. Please try again or contact support.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <TopBar title="Advertise Your Store" showBack={false} />

      <PageWrapper className="flex flex-col gap-8 pb-10">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Megaphone size={32} className="text-[var(--brand-primary)]" />
          </div>
          <h2 className="font-display text-2xl font-black mb-2 tracking-tight">Boost Your Sales</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            Promote your store or specific products to reach more customers
          </p>
        </header>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <Eye size={20} className="mx-auto mb-2 text-blue-500" />
            <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">More Views</div>
          </Card>
          <Card className="p-4 text-center">
            <Users size={20} className="mx-auto mb-2 text-green-500" />
            <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">More Customers</div>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp size={20} className="mx-auto mb-2 text-orange-500" />
            <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">More Sales</div>
          </Card>
        </div>

        {/* Ad Type Selector */}
        <section>
          <h3 className="font-display font-black text-sm mb-3 uppercase tracking-widest text-[var(--text-muted)]">
            What do you want to promote?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={`p-4 cursor-pointer transition-all ${
                adType === 'store'
                  ? 'ring-2 ring-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                  : 'hover:border-[var(--brand-primary)]/50'
              }`}
              onClick={() => setAdType('store')}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  adType === 'store' ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--surface-bg)]'
                }`}>
                  <Store size={20} />
                </div>
                <div className="font-bold text-sm">Promote Store</div>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)]">
                Feature your entire store on the homepage
              </p>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-all ${
                adType === 'product'
                  ? 'ring-2 ring-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                  : 'hover:border-[var(--brand-primary)]/50'
              }`}
              onClick={() => setAdType('product')}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  adType === 'product' ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--surface-bg)]'
                }`}>
                  <ShoppingBag size={20} />
                </div>
                <div className="font-bold text-sm">Promote Product</div>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)]">
                Highlight a specific best-selling item
              </p>
            </Card>
          </div>
        </section>

        {/* Product Selector (if product ad type) */}
        {adType === 'product' && (
          <section>
            <h3 className="font-display font-black text-sm mb-3 uppercase tracking-widest text-[var(--text-muted)]">
              Select Product to Promote
            </h3>
            {products.length === 0 ? (
              <Card className="p-6 text-center">
                <ShoppingBag size={32} className="mx-auto mb-3 text-[var(--text-muted)] opacity-50" />
                <p className="text-sm font-bold text-[var(--text-secondary)]">No products yet</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                  onClick={() => navigate('/add-product')}
                >
                  Add Your First Product
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`p-3 cursor-pointer transition-all ${
                      formData.product_id === product.id
                        ? 'ring-2 ring-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                        : 'hover:border-[var(--brand-primary)]/50'
                    }`}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <div className="font-bold text-xs truncate">{product.name}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      ₦{product.price?.toLocaleString()}
                    </div>
                    {formData.product_id === product.id && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[var(--brand-primary)]">
                        <Check size={12} /> Selected
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Ad Packages */}
        <section>
          <h3 className="font-display font-black text-sm mb-3 uppercase tracking-widest text-[var(--text-muted)]">
            Choose Package
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {adPackages.map((pkg) => (
              <Card
                key={pkg.days}
                className={`p-4 cursor-pointer transition-all ${
                  formData.duration === pkg.days
                    ? 'ring-2 ring-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                    : 'hover:border-[var(--brand-primary)]/50'
                } ${pkg.popular ? 'border-2 border-[var(--brand-primary)]' : ''}`}
                onClick={() => handleSelectPackage(pkg)}
              >
                {pkg.popular && (
                  <div className="text-[8px] font-black uppercase text-[var(--brand-primary)] mb-1">
                    Most Popular
                  </div>
                )}
                <div className="text-2xl font-black font-mono text-[var(--brand-primary-dark)]">
                  ₦{pkg.price.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-[var(--text-secondary)]">
                  {pkg.days} days
                </div>
                <div className="text-[10px] font-bold uppercase text-[var(--text-muted)]">
                  {pkg.label}
                </div>
                {formData.duration === pkg.days && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[var(--brand-primary)]">
                    <Check size={12} /> Selected
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Ad Details */}
        <Card className="p-6">
          <h3 className="font-display font-black text-sm mb-4 uppercase tracking-widest text-[var(--text-muted)]">
            Ad Details
          </h3>
          <div className="flex flex-col gap-4">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Store Name
              </label>
              <div className="text-sm font-bold text-[var(--text-primary)]">
                {userProfile?.store_display_name || 'No store created yet'}
              </div>
              {!userProfile?.store_display_name && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => navigate('/onboarding')}
                >
                  Create Your Store
                </Button>
              )}
            </div>
            <Textarea
              label="Ad Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={adType === 'product' 
                ? "Describe why this product is great..." 
                : "Describe what makes your store special..."
              }
              maxChars={200}
              rows={4}
            />
            {formData.amount > 0 && (
              <div className="bg-[var(--surface-bg)] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Total</span>
                  <span className="text-2xl font-mono font-black text-[var(--brand-primary-dark)]">
                    ₦{formData.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-1">
                  for {formData.duration} days of advertising
                </div>
              </div>
            )}
            <Button
              variant="primary"
              size="lg"
              className="w-full gap-2"
              onClick={handleSubmit}
              loading={loading}
              disabled={!userProfile?.store_display_name}
            >
              <Megaphone size={18} />
              Submit Ad for Approval
            </Button>
          </div>
        </Card>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Check size={16} className="text-blue-600" />
            </div>
            <div className="text-xs text-blue-900">
              <p className="font-bold mb-1">How it works:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-700">
                <li>Choose store or product promotion</li>
                <li>Select a package and submit your ad</li>
                <li>Complete payment via WhatsApp</li>
                <li>Admin reviews and approves your ad</li>
                <li>Your ad goes live on the homepage!</li>
              </ol>
            </div>
          </div>
        </div>
      </PageWrapper>
    </AppShell>
  );
}
