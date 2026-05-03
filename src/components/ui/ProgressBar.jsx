export default function ProgressBar({ progress, label, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-[10px] font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-1.5 bg-[var(--border-default)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--brand-primary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
