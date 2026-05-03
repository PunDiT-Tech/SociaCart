import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[var(--surface-bg)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8"
      >
        <span className="text-9xl font-black text-[var(--brand-primary)]/10 block leading-none">404</span>
        <div className="text-6xl mt-[-40px]">🛰️</div>
      </motion.div>
      
      <h1 className="font-display text-3xl font-extrabold mb-3 tracking-tight">Store Not Found</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-xs mx-auto">
        The link you followed may be broken or the store has been moved.
      </p>

      <Button onClick={() => navigate('/')} className="gap-2 px-10">
        <Home size={18} /> Back to Safety
      </Button>
    </PageWrapper>
  );
}
