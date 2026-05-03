import { Sun, Moon } from 'lucide-react';
import useTheme from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-md)] text-[var(--text-primary)] hover:bg-[var(--surface-bg)] transition-all shadow-sm active:scale-90"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
