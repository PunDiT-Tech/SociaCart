import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Settings, Crown } from 'lucide-react';

export default function BottomNav() {
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/pricing', icon: Crown, label: 'Upgrade' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-card)]/80 backdrop-blur-xl border-t border-[var(--border-default)] px-6 pb-safe-offset-2 pt-2 flex justify-between items-center max-w-lg mx-auto">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 py-1 transition-all
            ${isActive ? 'text-[var(--brand-primary)]' : 'text-[var(--text-muted)]'}
          `}
        >
          <Icon size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
