import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, TrendingUp, Users, Eye, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
  const [formData, setFormData] = useState({
    store_name: userProfile?.store_display_name || '',
    description: '',
    duration: 7,
    amount: 0
  });

  const adPackages = [
    { days: 3, price: 3000, popular: false, label: 'Starter' },
    { days: 7, price: 5000, popular: true, label: 'Standard' },
    { days: 14, price: 8000, popular: false, label: 'Premium' },
    { days: 30, price: 12000, popular: false, label: 'Enterprise' },
  ];

  const handleSelectPackage = (pkg) => {
    setFormData({ ...formData, duration: pkg.days, amount: pkg.price });
  };

  const handleSubmit = async () => {
    if (!formData.description) {
      return toast.error("Please enter ad description");
    }
    if (formData.amount <= 0) {
      return toast.error("Please select a package");
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "ads"), {
        ...formData,
        user_id: user.uid,
        store_id: user.uid,
        status: 'pending',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
        ends_at: new Date(Date.now() + formData.duration * 24 * 60 * 60 * 1000).toISOString()
      });

      // Open WhatsApp for payment
      const adminPhone = "2348067369016";
      const message = `Hello! I want to purchase an advertisement.

*Ad Details:*
- Store: ${formData.store_name}
- Duration: ${formData.duration} days
- Amount: ₦${formData.amount.toLocaleString()}
- Description: ${formData.description}

Please provide payment details to activate my ad. Thank you!`;

      const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      toast.success("Ad submitted! Complete payment on WhatsApp.");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit ad");
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
            Get featured on the homepage and reach more customers
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
            <Input
              label="Store Name"
              value={formData.store_name}
              onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
              placeholder="Your store name"
            />
            <Textarea
              label="Ad Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you want to advertise..."
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
