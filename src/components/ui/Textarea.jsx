export default function Textarea({ 
  label, 
  error, 
  className = '', 
  maxChars,
  value = '',
  ...props 
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-end px-1">
        {label && (
          <label className="text-sm font-bold text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        {maxChars && (
          <span className={`text-[10px] font-mono ${value.length >= maxChars ? 'text-[var(--color-error)]' : 'text-[var(--text-muted)]'}`}>
            {value.length}/{maxChars}
          </span>
        )}
      </div>
      <textarea
        className={`
          w-full bg-[var(--surface-card)] border-2 border-[var(--border-default)] 
          rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-primary)] 
          placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)] 
          focus:ring-4 focus:ring-[var(--brand-primary)]/10 transition-all outline-none
          resize-none min-h-[120px]
          ${error ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/10' : ''}
          ${className}
        `}
        {...props}
        value={value}
      />
      {error && (
        <span className="text-xs font-medium text-[var(--color-error)] px-1">
          {error}
        </span>
      )}
    </div>
  );
}
