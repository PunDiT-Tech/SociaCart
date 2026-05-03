import { motion } from 'framer-motion';

export default function Toggle({ enabled, onChange, className = '' }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative w-12 h-6 flex items-center rounded-full transition-colors outline-none
        ${enabled ? 'bg-[var(--brand-primary)]' : 'bg-[var(--border-strong)]'}
        ${className}
      `}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}
