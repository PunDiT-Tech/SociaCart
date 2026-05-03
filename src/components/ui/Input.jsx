export default function Input({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  containerClass = '',
  ...props 
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClass}`}>
      {label && (
        <label className="text-sm font-bold text-[var(--text-secondary)] px-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-primary)] transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`
            w-full bg-[var(--surface-card)] border-2 border-[var(--border-default)] 
            rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-primary)] 
            placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)] 
            focus:ring-4 focus:ring-[var(--brand-primary)]/10 transition-all outline-none
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-medium text-[var(--color-error)] px-1 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
}
