export default function Badge({ 
  children, 
  variant = 'success',
  className = ''
}) {
  const variants = {
    success: "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border-[var(--brand-primary)]/20",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20",
    error:   "bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20",
    info:    "bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20",
    muted:   "bg-[var(--border-default)] text-[var(--text-secondary)] border-[var(--border-strong)]",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
