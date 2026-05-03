import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  disabled = false,
  ...props 
}) {
  const baseStyles = "relative flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary:   "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-dark)] shadow-glow-green",
    secondary: "bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--surface-bg)]",
    ghost:     "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--border-default)]",
    danger:    "bg-[var(--color-error)] text-white hover:opacity-90",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-[var(--radius-sm)]",
    md: "px-6 py-3 text-sm rounded-[var(--radius-md)]",
    lg: "px-8 py-4 text-base rounded-[var(--radius-lg)]",
    full: "w-full py-4 text-base rounded-[var(--radius-md)]",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
}
