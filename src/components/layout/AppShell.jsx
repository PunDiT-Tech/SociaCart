import BottomNav from './BottomNav';

export default function AppShell({ children, showNav = true }) {
  return (
    <div className="min-h-screen bg-[var(--surface-bg)] flex flex-col grain-overlay">
      <main className="flex-1 w-full max-w-lg mx-auto pb-24 relative z-10">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
