export default function LoadingSpinner({ fullScreen, className = '' }) {
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[var(--brand-primary)]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-[var(--brand-primary)] rounded-full animate-spin" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[var(--surface-bg)] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
