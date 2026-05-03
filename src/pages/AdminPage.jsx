import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Users, ShoppingBag, TrendingUp, ShieldCheck, Trash2, Crown, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Live listen for verification requests
    const qVer = query(collection(db, "verifications"), orderBy("created_at", "desc"));
    const unsubVer = onSnapshot(qVer, (snap) => {
      setPendingVerifications(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(v => v.status === 'pending'));
    });

    return () => unsubVer();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(query(collection(db, "users"), orderBy("created_at", "desc")));
      const productsSnap = await getDocs(collection(db, "products"));
      const ordersSnap = await getDocs(collection(db, "orders"));

      const userData = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(userData);
      
      setStats({
        totalUsers: userData.length,
        totalProducts: productsSnap.size,
        totalOrders: ordersSnap.size
      });
    } catch (err) {
      toast.error("Failed to load platform data");
    } finally {
      setLoading(false);
    }
  };

  const approveLogin = async (reqId) => {
    try {
      await updateDoc(doc(db, "verifications", reqId), { status: 'verified' });
      toast.success("Login Approved!");
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const rejectLogin = async (reqId) => {
    try {
      await deleteDoc(doc(db, "verifications", reqId));
      toast.success("Request removed");
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const upgradeUser = async (userId, currentPlan) => {
    const nextPlan = currentPlan === 'pro' ? 'business' : 'pro';
    try {
      await updateDoc(doc(db, "users", userId), { plan: nextPlan });
      toast.success(`User upgraded to ${nextPlan.toUpperCase()}`);
      fetchData();
    } catch (err) {
      toast.error("Upgrade failed");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("CRITICAL: Delete this store and all products?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      toast.success("Store removed from platform");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <AppShell showNav={false}>
      <TopBar title="Platform Control" showBack={true} />
      
      <PageWrapper className="flex flex-col gap-8 pb-20">
        {/* Verification Requests */}
        {pendingVerifications.length > 0 && (
          <section className="animate-pulse">
            <div className="flex items-center gap-2 mb-4 px-1">
              <MessageCircle size={18} className="text-orange-500" />
              <h2 className="font-display font-black uppercase text-[10px] tracking-widest text-[var(--text-muted)]">Pending Logins</h2>
            </div>
            <div className="flex flex-col gap-3">
              {pendingVerifications.map(v => (
                <Card key={v.id} className="p-4 bg-orange-50 border-orange-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-orange-950">{v.phone}</div>
                    <div className="text-xs font-mono font-bold text-orange-700">CODE: {v.code}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveLogin(v.id)} className="px-4 py-2 bg-green-600 text-white text-[10px] font-black uppercase rounded-lg shadow-md">Approve</button>
                    <button onClick={() => rejectLogin(v.id)} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={14} /></button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Platform Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center border-none bg-white shadow-sm">
            <Users size={16} className="mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-black font-mono">{stats.totalUsers}</div>
            <div className="text-[8px] font-bold uppercase text-[var(--text-muted)]">Users</div>
          </Card>
          <Card className="p-4 text-center border-none bg-white shadow-sm">
            <ShoppingBag size={16} className="mx-auto mb-2 text-green-500" />
            <div className="text-xl font-black font-mono">{stats.totalProducts}</div>
            <div className="text-[8px] font-bold uppercase text-[var(--text-muted)]">Items</div>
          </Card>
          <Card className="p-4 text-center border-none bg-white shadow-sm">
            <TrendingUp size={16} className="mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-black font-mono">{stats.totalOrders}</div>
            <div className="text-[8px] font-bold uppercase text-[var(--text-muted)]">Orders</div>
          </Card>
        </div>

        {/* User Management */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <ShieldCheck size={18} className="text-[var(--brand-primary)]" />
            <h2 className="font-display font-black uppercase text-[10px] tracking-widest text-[var(--text-muted)]">Manage Sellers</h2>
          </div>

          {users.map(u => (
            <Card key={u.id} className="p-4 flex items-center gap-4 bg-white border-none shadow-sm">
              <Avatar name={u.store_display_name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="font-bold text-sm truncate">{u.store_display_name}</h4>
                  <Badge variant={u.plan === 'pro' ? 'success' : u.plan === 'business' ? 'info' : 'muted'}>
                    {u.plan || 'basic'}
                  </Badge>
                </div>
                <div className="text-[10px] font-medium text-[var(--text-muted)] truncate">{u.phone}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => upgradeUser(u.id, u.plan)}
                  className="p-2 bg-[var(--surface-bg)] text-[var(--brand-primary)] rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition-all"
                  title="Upgrade Plan"
                >
                  <Crown size={16} />
                </button>
                <button 
                  onClick={() => deleteUser(u.id)}
                  className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  title="Delete Store"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </PageWrapper>
    </AppShell>
  );
}
