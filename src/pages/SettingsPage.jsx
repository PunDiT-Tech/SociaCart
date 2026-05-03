import { LogOut, User, Palette, Globe, ShieldAlert, Share2, LayoutGrid } from 'lucide-react';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { updateStore } from '../services/storeService';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { userProfile, user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    store_display_name: userProfile?.store_display_name || '',
    store_description: userProfile?.store_description || '',
    store_category: userProfile?.store_category || 'Fashion'
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateStore(user.uid, formData);
      toast.success("Settings saved!");
    } catch (err) {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <AppShell>
      <TopBar title="Settings" showBack={false} />
      
      <PageWrapper className="flex flex-col gap-8 pb-10">
        {/* Admin Secret Entry */}
        {isAdmin && (
          <section className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4 px-1">
              <LayoutGrid size={18} className="text-purple-500" />
              <h2 className="font-display font-bold uppercase text-[10px] tracking-[0.2em] text-[var(--text-muted)]">Owner Tools</h2>
            </div>
            <Link to="/admin">
              <Card className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none shadow-lg active:scale-95 transition-transform">
                <span className="text-sm font-black uppercase tracking-widest">Admin Control Panel</span>
                <LayoutGrid size={20} />
              </Card>
            </Link>
          </section>
        )}

        {/* Appearance */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <Palette size={18} className="text-[var(--brand-primary)]" />
            <h2 className="font-display font-bold uppercase text-[10px] tracking-[0.2em] text-[var(--text-muted)]">Appearance</h2>
          </div>
          <Card className="flex items-center justify-between p-4">
            <span className="text-sm font-bold">Dark Mode</span>
            <ThemeToggle />
          </Card>
        </section>

        {/* Store Info */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <User size={18} className="text-[var(--brand-primary)]" />
            <h2 className="font-display font-bold uppercase text-[10px] tracking-[0.2em] text-[var(--text-muted)]">Store Profile</h2>
          </div>
          <Card className="p-6">
            <form onSubmit={handleUpdate} className="flex flex-col gap-6">
              <Input 
                label="Store Name"
                value={formData.store_display_name}
                onChange={e => setFormData({ ...formData, store_display_name: e.target.value })}
              />
              <Textarea 
                label="Description"
                value={formData.store_description}
                onChange={e => setFormData({ ...formData, store_description: e.target.value })}
                maxChars={160}
              />
              <Button loading={loading} type="submit">Save Changes</Button>
            </form>
          </Card>
        </section>

        {/* Account */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <ShieldAlert size={18} className="text-red-500" />
            <h2 className="font-display font-bold uppercase text-[10px] tracking-[0.2em] text-[var(--text-muted)]">Danger Zone</h2>
          </div>
          <Card className="p-4 border-red-500/20 bg-red-500/5">
            <Button variant="danger" className="w-full gap-2" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </Button>
          </Card>
        </section>

        <footer className="text-center">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            SociaCart v3.0.0
          </p>
        </footer>
      </PageWrapper>
    </AppShell>
  );
}
