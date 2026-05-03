import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Mail, ShieldCheck, Sparkles, Smartphone, Key, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn, signUp, resetPassword, sendOTP, confirmOTP, clearRecaptcha } from '../services/authService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import PageWrapper from '../components/layout/PageWrapper';
import toast from 'react-hot-toast';

const featureItems = [
  'Secure email or phone login',
  'Fast SMS authentication',
  'Built for WhatsApp selling',
];

const countries = [
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
];

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);

  // Phone auth state
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneStep, setPhoneStep] = useState('number'); // 'number' or 'otp'

  const navigate = useNavigate();

  const formattedPhone = phoneNumber.replace(/\D/g, '');
  const fullPhone = `${countryCode}${formattedPhone}`;

  // ============ EMAIL AUTH ============

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || (!password && !showReset)) return toast.error('Enter email and password');

    setLoading(true);
    try {
      if (showReset) {
        await resetPassword(email);
        toast.success('Password reset email sent! Check your inbox.');
        setShowReset(false);
        setEmail('');
      } else if (isSignUp) {
        await signUp(email, password);
        toast.success('Account created');
        navigate('/');
      } else {
        await signIn(email, password);
        toast.success('Welcome back');
        navigate('/');
      }
    } catch (err) {
      const message = err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password'
        ? 'Invalid email or password'
        : err?.code === 'auth/email-already-in-use'
        ? 'Email already registered'
        : err?.code === 'auth/too-many-requests'
        ? 'Too many attempts. Try again later.'
        : err?.message || 'Authentication failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ============ PHONE AUTH ============

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formattedPhone || formattedPhone.length < 7) {
      return toast.error('Enter a valid phone number');
    }

    setLoading(true);
    try {
      const result = await sendOTP(fullPhone);
      setConfirmationResult(result);
      setPhoneStep('otp');
      toast.success('SMS code sent!');
    } catch (err) {
      clearRecaptcha();
      toast.error(err?.message || 'Failed to send SMS code');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOTP = async (e) => {
    e.preventDefault();
    if (!confirmationResult) return toast.error('Request a new SMS code');
    if (otpCode.trim().length < 6) return toast.error('Enter the 6-digit code');

    setLoading(true);
    try {
      await confirmOTP(confirmationResult, otpCode.trim());
      toast.success('Phone number verified');
      navigate('/');
    } catch (err) {
      toast.error(err?.message || 'Invalid SMS code');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneBack = () => {
    setPhoneStep('number');
    setOtpCode('');
    setConfirmationResult(null);
    clearRecaptcha();
  };

  // ============ RENDER ============

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
              <span className="block text-[var(--text-secondary)]">signs you in your way.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
              Access your store dashboard with email or phone - whatever works best for you.
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
                <Mail size={18} className="mb-3 text-[var(--brand-primary)]" />
                <div className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Email</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">Traditional login</div>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-slate-950/70">
                <Smartphone size={18} className="mb-3 text-[var(--brand-primary)]" />
                <div className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Phone</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">SMS verification</div>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-slate-950/70">
                <ShieldCheck size={18} className="mb-3 text-[var(--brand-primary)]" />
                <div className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Secure</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">Both protected</div>
              </div>
            </div>
          </section>

          <section className="flex justify-center md:justify-end">
            <Card
              variant="glass"
              className="w-full max-w-md border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-950/85 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-white shadow-lg">
                  {showReset ? <Key size={24} /> : phoneStep === 'otp' ? <MessageCircle size={24} /> : <span className="font-display text-xl font-black tracking-tight">SC</span>}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">SociaCart</div>
                  <h2 className="font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
                    {showReset ? 'Reset Password' : phoneStep === 'otp' ? 'Enter SMS Code' : isSignUp ? 'Create account' : 'Welcome back'}
                  </h2>
                </div>
              </div>

              {/* Auth Method Selector */}
              {!showReset && (
                <div className="mb-6 flex gap-2 p-1 bg-[var(--surface-bg)] rounded-xl">
                  <button
                    onClick={() => {
                      setAuthMethod('email');
                      setPhoneStep('number');
                    }}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                      authMethod === 'email'
                        ? 'bg-white dark:bg-slate-800 text-[var(--brand-primary)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Mail size={16} /> Email
                  </button>
                  <button
                    onClick={() => {
                      setAuthMethod('phone');
                      setPhoneStep('number');
                    }}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                      authMethod === 'phone'
                        ? 'bg-white dark:bg-slate-800 text-[var(--brand-primary)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Smartphone size={16} /> Phone
                  </button>
                </div>
              )}

              <div id="recaptcha-container" />

              <AnimatePresence mode="wait">
                {/* EMAIL AUTH */}
                {authMethod === 'email' && (
                  <motion.form
                    key="email"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={showReset ? handleEmailAuth : handleEmailAuth}
                    className="flex flex-col gap-6"
                  >
                    {showReset ? (
                      <>
                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
                          <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">
                            Email Address
                          </label>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                          />
                          <p className="mt-3 text-xs text-[var(--text-secondary)]">
                            Enter the email associated with your account and we'll send you a password reset link.
                          </p>
                        </div>

                        <Button type="submit" size="lg" className="w-full gap-3 py-4" loading={loading}>
                          <Key size={20} />
                          Send Reset Link
                        </Button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowReset(false);
                            setEmail('');
                          }}
                          className="text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                        >
                          ← Back to Login
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
                          <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">
                            Email Address
                          </label>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>

                        {isSignUp && (
                          <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
                            <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">
                              Phone Number
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="h-12 rounded-[var(--radius-md)] border-2 border-[var(--border-default)] bg-[var(--surface-card)] px-3 text-sm font-bold outline-none transition-colors focus:border-[var(--brand-primary)] w-32"
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                containerClass="flex-1"
                                className="h-12"
                              />
                            </div>
                          </div>
                        )}

                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-bg)]/70 p-4">
                          <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[var(--text-muted)]">
                            Password
                          </label>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>

                        {!isSignUp && (
                          <button
                            type="button"
                            onClick={() => setShowReset(true)}
                            className="text-right text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--brand-primary)] -mt-2"
                          >
                            Forgot Password?
                          </button>
                        )}

                        <Button type="submit" size="lg" className="w-full gap-3 py-4" loading={loading}>
                          <ShieldCheck size={20} />
                          {isSignUp ? 'Create Account' : 'Sign In'}
                        </Button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsSignUp(!isSignUp);
                            setShowReset(false);
                          }}
                          className="text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                        >
                          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                        </button>
                      </>
                    )}
                  </motion.form>
                )}

                {/* PHONE AUTH */}
                {authMethod === 'phone' && (
                  <motion.form
                    key="phone"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={phoneStep === 'number' ? handleSendOTP : handleConfirmOTP}
                    className="flex flex-col gap-6"
                  >
                    {phoneStep === 'number' ? (
                      <>
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
                          <p className="mt-3 text-xs text-[var(--text-secondary)]">
                            We will send a one-time code to this number.
                          </p>
                        </div>

                        <Button type="submit" size="lg" className="w-full gap-3 py-4" loading={loading}>
                          <MessageCircle size={20} fill="currentColor" />
                          Send SMS Code
                        </Button>

                        <div className="text-center text-xs font-medium text-[var(--text-muted)]">
                          Your number: {fullPhone || `${countryCode}...`}
                        </div>
                      </>
                    ) : (
                      <>
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
                          <p className="mt-3 text-xs text-[var(--text-secondary)]">
                            Enter the 6-digit verification code from SMS.
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

                        <Button type="button" variant="ghost" onClick={handlePhoneBack} className="text-[10px] font-black uppercase tracking-[0.22em]">
                          Change Number
                        </Button>
                      </>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
