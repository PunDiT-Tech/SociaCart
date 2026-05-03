import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function PricingPage() {
  const { userProfile } = useAuth();
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      icon: <Zap size={24} className="text-slate-400" />,
      features: [
        'Up to 5 Products',
        'Standard Store Theme',
        'WhatsApp Ordering',
        'Basic Analytics',
        'Platform Branding Included'
      ],
      buttonText: 'Current Plan',
      color: 'var(--text-muted)'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₦5,000/mo',
      recommended: true,
      icon: <Crown size={24} className="text-[var(--brand-gold)]" />,
      features: [
        'Unlimited Products',
        'Custom Logo & Theme',
        'Remove Platform Branding',
        'Advanced Stats',
        'Priority Support'
      ],
      buttonText: 'Upgrade to Pro',
      color: 'var(--brand-primary)'
    },
    {
      id: 'business',
      name: 'Business',
      price: '₦12,500/mo',
      icon: <Rocket size={24} className="text-blue-500" />,
      features: [
        'Everything in Pro',
        'Custom Domain Mapping',
        'Multiple Store Staff',
        'Inventory Alerts',
        'Featured Store Badge'
      ],
      buttonText: 'Go Business',
      color: '#3b82f6'
    }
  ];

  const handleUpgrade = (planName) => {
    const adminPhone = "2348067369016";
    const message = `Hello! I'm the owner of *${userProfile?.store_display_name}* and I want to upgrade to the *${planName}* plan. Please provide payment details.`;
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AppShell>
      <TopBar title="Upgrade Plan" showBack={false} />
      
      <PageWrapper className="flex flex-col gap-8 pb-10">
        <header className="text-center">
          <h2 className="font-display text-2xl font-black mb-2 tracking-tight">Scale Your Business</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Choose the plan that fits your growth.</p>
        </header>

        <div className="flex flex-col gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              variant={plan.recommended ? 'elevated' : 'flat'}
              className={`relative overflow-hidden ${plan.recommended ? 'ring-2 ring-[var(--brand-primary)]' : ''}`}
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
                  <div>
                    <h3 className="font-display font-black text-lg">{plan.name}</h3>
                    <div className="font-mono font-black text-[var(--brand-primary-dark)]">{plan.price}</div>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-[var(--text-secondary)]">
                      <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.id === userProfile?.plan ? 'secondary' : 'primary'}
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  disabled={plan.id === userProfile?.plan}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.id === userProfile?.plan ? 'Current Plan' : plan.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </PageWrapper>
    </AppShell>
  );
}
