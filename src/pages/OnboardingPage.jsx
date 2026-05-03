import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createStore, getStoreBySlug } from '../services/storeService';
import { sanitizeSlug } from '../utils/sanitize';
import useDebounce from '../hooks/useDebounce';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    store_display_name: '',
    store_name: '',
    store_category: 'Fashion',
    store_description: ''
  });
  const [slugStatus, setSlugStatus] = useState('idle'); 
  const [loading, setLoading] = useState(false);
  
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const debouncedSlug = useDebounce(formData.store_name, 600);

  useEffect(() => {
    if (userProfile) navigate('/');
  }, [userProfile, navigate]);

  useEffect(() => {
    if (debouncedSlug && debouncedSlug.length >= 3) {
      checkAvailability(debouncedSlug);
    } else {
      setSlugStatus('idle');
    }
  }, [debouncedSlug]);

  const checkAvailability = async (slug) => {
    setSlugStatus('checking');
    try {
      const existing = await getStoreBySlug(slug);
      setSlugStatus(existing ? 'taken' : 'available');
    } catch (err) {
      setSlugStatus('idle');
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData({
      ...formData,
      store_display_name: val,
      store_name: sanitizeSlug(val)
    });
  };

  const handleSubmit = async () => {
    if (slugStatus !== 'available') return toast.error("Please choose a unique store name");
    
    setLoading(true);
    try {
      await createStore(user.uid, {
        ...formData,
        phone: user.phoneNumber,
        theme_color: '#25D366',
        plan: 'basic'
      });
      setStep(3);
    } catch (err) {
      toast.error("Failed to create store. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Fashion', emoji: '👗' },
    { name: 'Food', emoji: '🍔' },
    { name: 'Electronics', emoji: '📱' },
    { name: 'Beauty', emoji: '💄' },
    { name: 'Home', emoji: '🏠' },
    { name: 'Other', emoji: '✨' }
  ];

  return (
    <PageWrapper className="min-h-screen bg-[var(--surface-bg)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-[var(--brand-primary)]' : 'w-2 bg-[var(--border-strong)]'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex flex-col gap-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-black mb-2 tracking-tight">Name Your Store</h1>
                <p className="text-[var(--text-secondary)] text-sm">Pick something catchy and unique.</p>
              </div>

              <div className="flex flex-col gap-4">
                <Input 
                  label="Business Name"
                  placeholder="e.g. Adidas Fashion Store"
                  value={formData.store_display_name}
                  onChange={handleNameChange}
                  icon={Store}
                />
                
                <div className="px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-2">Public Link</span>
                  <div className="bg-[var(--surface-card)] border border-[var(--border-default)] p-3 rounded-xl flex items-center gap-2 overflow-hidden">
                    <span className="text-[var(--text-muted)] text-xs font-medium shrink-0">sociacart.me/</span>
                    <span className="text-[var(--text-primary)] text-sm font-black truncate">{formData.store_name || '...'}</span>
                    <div className="ml-auto shrink-0">
                      {slugStatus === 'checking' && <div className="w-4 h-4 border-2 border-[var(--brand-primary)]/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />}
                      {slugStatus === 'available' && <CheckCircle2 size={18} className="text-[var(--brand-primary)]" />}
                      {slugStatus === 'taken' && <span className="text-[10px] font-black text-red-500 uppercase">Taken</span>}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full gap-2" 
                disabled={slugStatus !== 'available' || !formData.store_display_name}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight size={18} />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex flex-col gap-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-black mb-2 tracking-tight">Almost There!</h1>
                <p className="text-[var(--text-secondary)] text-sm">Tell us about your business.</p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-sm font-black text-[var(--text-secondary)] block mb-3 px-1">Select Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => setFormData({ ...formData, store_category: cat.name })}
                        className={`
                          flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all gap-1
                          ${formData.store_category === cat.name 
                            ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] text-[var(--brand-primary)]' 
                            : 'bg-[var(--surface-card)] border-[var(--border-default)] text-[var(--text-secondary)]'}
                        `}
                      >
                        <span className="text-xl">{cat.emoji}</span>
                        <span className="text-[10px] font-black uppercase">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Textarea 
                  label="Description"
                  placeholder="Tell customers what you sell..."
                  maxChars={160}
                  value={formData.store_description}
                  onChange={e => setFormData({ ...formData, store_description: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button size="lg" className="flex-[2]" loading={loading} onClick={handleSubmit}>Create My Store</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 bg-[var(--brand-primary)] text-white rounded-full flex items-center justify-center shadow-glow-green mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h1 className="font-display text-4xl font-black tracking-tighter">You&apos;re Live!</h1>
              <Button size="lg" className="w-full py-5 text-lg" onClick={() => navigate('/')}>
                Open My Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
