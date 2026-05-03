import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendOTP } from '../services/authService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import PageWrapper from '../components/layout/PageWrapper';
import toast from 'react-hot-toast';

const featureItems = [
  'Verified phone login',
  'Fast SMS authentication',
  'Built for WhatsApp selling',
];

const countries = [
  { name: 'Nigeria', code: '+234', flag: 'NG' },
  { name: 'Ghana', code: '+233', flag: 'GH' },
  { name: 'Kenya', code: '+254', flag: 'KE' },
  { name: 'United Kingdom', code: '+44', flag: 'UK' },
  { name: 'United States', code: '+1', flag: 'US' },
];

export default function AuthPage() {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [fullPhone, setFullPhone] = useState('');

  const navigate = useNavigate();

  const formattedPhone = useMemo(() => {
    const digits = phoneNumber.replace(/\D/g, '');
    const cleanNumber = digits.startsWith('0') ? digits.slice(1) : digits;
    return `${countryCode}${cleanNumber}`;
  }, [countryCode, phoneNumber]);

  const handleSendSms = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return toast.error('Enter phone number');

    setLoading(true);
    try {
      const result = await sendOTP(formattedPhone);
      setConfirmationResult(result);
      setFullPhone(formattedPhone);
      setStep('otp');
      toast.success('SMS code sent');
    } catch (err) {
      toast.error(err?.message || 'Failed to send SMS code');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSms = async (e) => {
    e.preventDefault();
    if (!confirmationResult) return toast.error('Request a new SMS code');
    if (otpCode.trim().length < 6) return toast.error('Enter the 6-digit code');

    setLoading(true);
    try {
      await confirmationResult.confirm(otpCode.trim());
      toast.success('Phone number verified');
      navigate('/');
    } catch (err) {
      toast.error(err?.message || 'Invalid SMS code');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setStep('phone');
    setOtpCode('');
    setConfirmationResult(null);
    setFullPhone('');
  };

  return (
    <PageWrapper className="min-h-screen bg-[var(--surface-bg)]">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,211,102,0.12)_0%,rgba(18,140,126,0.08)_38%,rgba(248,250,252,0.96)_72%)] dark:bg-[linear-gradient(135deg,rgba(37,211,102,0.12)_0%,rgba(18,140,126,0.1)_38%,rgba(2,6,23,0.98)_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />

        <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-8 lg:px-12">
          <section className="hidden md:flex flex-col justify-center pr-6">
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-default)] bg-white/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--text-secondary)] shadow-sm backdrop-blur-md dark:bg-slate-950/70">
              <Sparkles size={14} className="text-[var(--brand-primary)]" />
              SociaCart
            </div>

            <h1 className="max-w-xl font-display text-5xl font-black tracking-tight text-[var(--text-primary)] lg:text-6xl">
              SociaCart
              <span className="block text-[var(--text-secondary)]">signs you in with a verified phone number.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
              Access your store dashboard with a clean SMS login flow designed for fast setup, safer access, and a professional storefront experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {featureItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-white/75 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-md dark:bg-slate-950/70"
                >
                  <CheckCircle2 size={16} className="text-[var(--brand-primary)]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-slate-950/70">
                <Smartphone size={18} className="mb-3 text-[var(--brand-primary)]" />
                <div className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Phone based</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">No extra passwords</div>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-slate-950/70">
                <ShieldCheck size={18} className="mb-3 text-[var(--brand-primary)]" />
                <div className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Verified access</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">One-time SMS code</div>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-slate-950/70">
                <Sparkles size={18} className="mb-3 text-[var(--brand-primary)]" />
                <div className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Brand ready</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">SociaCart dashboard</div>
              </div>
            </div>
          </section>

          <section className="flex justify-center md:justify-end">
            <Card
              variant="glass"
              className="w-full max-w-md border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-950/85 sm:p-8"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-white shadow-lg">
                  <span className="font-display text-xl font-black tracking-tight">SC</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">SociaCart</div>
                  <h2 className="font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
                    {step === 'phone' ? 'Login with SMS' : 'Enter verification code'}
                  </h2>
                </div>
              </div>

              {step === 'phone' ? (
                <form onSubmit={handleSendSms} className="flex flex-col gap-6">
                  <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-12 rounded-[var(--radius-md)] border-2 border-[var(--border-default)] bg-[var(--surface-card)] px-3 text-sm font-bold outline-none transition-colors focus:border-[var(--brand-primary)]"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="801 234 5678"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        containerClass="flex-1"
                        className="h-12"
                      />
                    </div>
                    <p className="mt-3 text-xs leading-5 text-[var(--text-muted)]">
                      We will send a one-time code to this number.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-3 py-4" loading={loading}>
                    <MessageCircle size={20} fill="currentColor" />
                    Send SMS Code
                  </Button>

                  <div className="text-center text-xs font-medium text-[var(--text-muted)]">
                    Your number is formatted as {formattedPhone || `${countryCode}...`}
                  </div>
                </form>
              ) : (
                <form onSubmit={handleConfirmSms} className="flex flex-col gap-6">
                  <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                        <ShieldCheck size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">Code sent</div>
                        <div className="truncate text-sm font-semibold text-[var(--text-primary)]">{fullPhone}</div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-[var(--text-muted)]">
                      Enter the 6-digit verification code from SMS to continue.
                    </p>
                  </div>

                  <Input
                    aria-label="SMS verification code"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl font-mono font-black tracking-widest"
                  />

                  <Button type="submit" size="lg" className="w-full gap-3 py-4" loading={loading}>
                    <ShieldCheck size={20} />
                    Verify SMS Code
                  </Button>

                  <Button type="button" variant="ghost" onClick={handleChangeNumber} className="text-[10px] font-black uppercase tracking-[0.22em]">
                    Change Number
                  </Button>
                </form>
              )}
            </Card>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
