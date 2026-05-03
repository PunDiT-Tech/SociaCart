import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function TopBar({ title, showBack = true, actions }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-bg)]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-md)] text-[var(--text-primary)]"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="min-w-0">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">
            SociaCart
          </div>
          <h1 className="truncate font-display text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  );
}
