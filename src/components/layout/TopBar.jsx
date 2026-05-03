import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function TopBar({ title, showBack = true, actions }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-bg)]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-md)] text-[var(--text-primary)]"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="font-display text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
          {title}
        </h1>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  );
}
