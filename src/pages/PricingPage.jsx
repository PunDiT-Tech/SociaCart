import { Check, Zap, Crown, Rocket, Calendar, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PricingPage() {
  const { userProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const durationOptions = [
    { months: 1, discount: 0, label: '1 Month' },
    { months: 3, discount: 5, label: '3 Months (-5%)' },
    { months: 6, discount: 10, label: '6 Months (-10%)' },
    { months: 12, discount: 20, label: '12 Months (-20%)' },
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      icon: <Zap size={24} className="text-slate-400" />,
      features: [
        'Up to 5 Products',
        'Standard Store Theme',
        'WhatsApp Ordering',
        'Basic Analytics',
        'Platform Branding Included'
      ],
      color: 'var(--text-muted)'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 5000,
      recommended: true,
      icon: <Crown size={24} className="text-[var(--brand-gold)]" />,
      features: [
        'Unlimited Products',
        'Custom Logo & Theme',
        'Remove Platform Branding',
        'Advanced Stats',
        'Priority Support'
      ],
      color: 'var(--brand-primary)'
    },
    {
      id: 'business',
      name: 'Business',
      price: 12500,
      icon: <Rocket size={24} className="text-blue-500" />,
      features: [
        'Everything in Pro',
        'Custom Domain Mapping',
        'Multiple Store Staff',
        'Inventory Alerts',
        'Featured Store Badge'
      ],
      color: '#3b82f6'
    }
  ];

  const calculateTotal = (planPrice, months, qty) => {
    if (planPrice === 0) return 0;
    const durationOption = durationOptions.find(d => d.months === months);
    const discount = durationOption?.discount || 0;
    const baseTotal = planPrice * months * qty;
    const discountAmount = baseTotal * (discount / 100);
    return baseTotal - discountAmount;
  };

  const handleUpgrade = (plan) => {
    if (plan.id === 'basic') {
      toast.error("You're already on the Basic plan");
      return;
    }
    setSelectedPlan(plan);
  };

  const confirmUpgrade = () => {
    if (!selectedPlan) return;

    const total = calculateTotal(selectedPlan.price, duration, quantity);
    const durationLabel = durationOptions.find(d => d.months === duration)?.label;

    const adminPhone = "2348067369016";
    const message = `Hello! I want to upgrade my store to the *${selectedPlan.name}* plan.

📦 *Subscription Details:*
- Plan: ${selectedPlan.name}
- Duration: ${durationLabel}
- Quantity: ${quantity} store(s)
- Total: ₦${total.toLocaleString()}

My Store: *${userProfile?.store_display_name || 'Not set'}*
Phone: *${userProfile?.phone || 'Not set'}*

Please provide payment details to proceed. Thank you!`;

    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSelectedPlan(null);
  };

  const currentPlan = plans.find(p => p.id === userProfile?.plan) || plans[0];

  return (
    <AppShell>
      <TopBar title="Upgrade Plan" showBack={false} />

      <PageWrapper className="flex flex-col gap-8 pb-10">
        <header className="text-center">
          <h2 className="font-display text-2xl font-black mb-2 tracking-tight">Scale Your Business</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Choose the plan that fits your growth.</p>
        </header>

        {/* Current Plan Banner */}
        <Card className="p-4 bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--brand-primary)] text-white">
              {currentPlan.icon}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Current Plan</div>
              <div className="font-display font-black text-lg">{currentPlan.name} Plan</div>
            </div>
          </div>
        </Card>

        {/* Plan Selection */}
        <div className="flex flex-col gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.recommended ? 'elevated' : 'flat'}
              className={`relative overflow-hidden transition-all ${
                selectedPlan?.id === plan.id 
                  ? 'ring-2 ring-[var(--brand-primary)] shadow-lg' 
                  : plan.recommended 
                    ? 'ring-2 ring-[var(--brand-primary)]' 
                    : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-[var(--brand-primary)] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[var(--surface-bg)] border border-[var(--border-default)]">
                    {plan.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-black text-lg">{plan.name}</h3>
                    <div className="font-mono font-black text-[var(--brand-primary-dark)]">
                      {plan.price === 0 ? 'Free' : `₦${plan.price.toLocaleString()}/month`}
                    </div>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-[var(--text-secondary)]">
                      <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.id !== 'basic' && (
                  <Button
                    variant={selectedPlan?.id === plan.id ? 'primary' : 'secondary'}
                    className="w-full py-4"
                    onClick={() => handleUpgrade(plan)}
                  >
                    {selectedPlan?.id === plan.id ? 'Selected ✓' : 'Select Plan'}
                  </Button>
                )}
                {plan.id === 'basic' && (
                  <Button variant="secondary" className="w-full py-4" disabled>
                    Current Plan
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Duration & Quantity Selection */}
        {selectedPlan && selectedPlan.id !== 'basic' && (
          <Card className="p-6 border-2 border-[var(--brand-primary)]">
            <h3 className="font-display font-black text-lg mb-4">Subscription Details</h3>
            
            {/* Duration */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] mb-3">
                <Calendar size={16} className="text-[var(--brand-primary)]" />
                Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.months}
                    onClick={() => setDuration(opt.months)}
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      duration === opt.months
                        ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
                        : 'border-[var(--border-default)] hover:border-[var(--brand-primary)]/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] mb-3">
                <Users size={16} className="text-[var(--brand-primary)]" />
                Number of Stores
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border-2 border-[var(--border-default)] font-bold hover:bg-[var(--surface-bg)]"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-black font-mono">{quantity}</div>
                  <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Store(s)</div>
                </div>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-10 h-10 rounded-xl border-2 border-[var(--border-default)] font-bold hover:bg-[var(--surface-bg)]"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">Max 5 stores per subscription</p>
            </div>

            {/* Total */}
            <div className="bg-[var(--surface-bg)] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[var(--text-secondary)]">Base Price</span>
                <span className="font-mono font-bold">₦{(selectedPlan.price * duration * quantity).toLocaleString()}</span>
              </div>
              {durationOptions.find(d => d.months === duration)?.discount > 0 && (
                <div className="flex items-center justify-between mb-2 text-green-600">
                  <span className="text-sm font-bold">Discount ({durationOptions.find(d => d.months === duration)?.discount}%)</span>
                  <span className="font-mono font-bold">-₦{((selectedPlan.price * duration * quantity) * (durationOptions.find(d => d.months === duration)?.discount / 100)).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-[var(--border-default)] pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black">Total</span>
                  <span className="text-2xl font-mono font-black text-[var(--brand-primary-dark)]">
                    ₦{calculateTotal(selectedPlan.price, duration, quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1 py-4"
                onClick={() => setSelectedPlan(null)}
              >
                Change Plan
              </Button>
              <Button
                variant="primary"
                className="flex-1 py-4 gap-2"
                onClick={confirmUpgrade}
              >
                <Check size={18} />
                Proceed to Payment
              </Button>
            </div>
          </Card>
        )}
      </PageWrapper>
    </AppShell>
  );
}
