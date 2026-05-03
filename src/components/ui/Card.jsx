import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  variant = 'flat', 
  padding = 'md',
  className = '',
  ...props 
}) {
  const variants = {
    flat: "bg-[var(--surface-card)] border border-[var(--border-default)]",
    elevated: "bg-[var(--surface-card)] shadow-md border border-[var(--border-default)]",
    glass: "glass-card shadow-lg",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  return (
    <motion.div
      className={`rounded-[var(--radius-lg)] overflow-hidden ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
