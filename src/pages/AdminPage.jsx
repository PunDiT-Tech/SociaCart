import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot, setDoc } from 'firebase/firestore';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Users, ShoppingBag, TrendingUp, ShieldCheck, Trash2, Crown, MessageCircle, DollarSign, Save, X, Trophy, Megaphone, CheckCircle, Clock, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [planPrices, setPlanPrices] = useState({ pro: 5000, business: 12500 });
  const [editingPrices, setEditingPrices] = useState(false);
  const [tempPrices, setTempPrices] = useState({ pro: 5000, business: 12500 });
  const [topSellers, setTopSellers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [activeAds, setActiveAds] = useState([]);
  const [adStats, setAdStats] = useState({ totalAds: 0, activeAds: 0, revenue: 0 });

  useEffect(() => {
    fetchData();
    loadPlanPrices();
    loadAnalytics();
    loadAds();

    // Live listen for verification requests
    const qVer = query(collection(db, "verifications"), orderBy("created_at", "desc"));
    const unsubVer = onSnapshot(qVer, (snap) => {
      setPendingVerifications(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(v => v.status === 'pending'));
    });

    return () => unsubVer();
  }, []);

  const loadAnalytics = async () => {
    try {
      const usersSnap = await getDocs(collection(db, "users"));
      const productsSnap = await getDocs(collection(db, "products"));
      
      // Calculate top sellers by order count
      const userData = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const sellersWithOrders = userData
        .filter(u => u.store_display_name)
        .sort((a, b) => (b.total_orders || 0) - (a.total_orders || 0))
        .slice(0, 5);
      setTopSellers(sellersWithOrders);

      // Calculate top products by order count
      const productsData = productsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const topProds = productsData
        .filter(p => p.name && p.order_count > 0)
        .sort((a, b) => (b.order_count || 0) - (a.order_count || 0))
        .slice(0, 5);
      setTopProducts(topProds);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    }
  };

  const loadAds = async () => {
    try {
      const adsSnap = await getDocs(query(collection(db, "ads"), orderBy("created_at", "desc")));
      const adsData = adsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setActiveAds(adsData.filter(ad => ad.status === 'active'));
      
      const revenue = adsData
        .filter(ad => ad.payment_status === 'paid')
        .reduce((sum, ad) => sum + (ad.amount || 0), 0);
      
      setAdStats({
        totalAds: adsData.length,
        activeAds: adsData.filter(ad => ad.status === 'active').length,
        revenue
      });
    } catch (err) {
      console.error("Failed to load ads:", err);
    }
  };

  const loadPlanPrices = async () => {
    try {
      const pricesDoc = await getDocs(query(collection(db, "settings"), orderBy("created_at", "desc")));
      if (!pricesDoc.empty) {
        const data = pricesDoc.docs[0].data();
        setPlanPrices({ pro: data.proPrice || 5000, business: data.businessPrice || 12500 });
      }
    } catch (err) {
      console.error("Failed to load plan prices:", err);
    }
  };

  const savePlanPrices = async () => {
    try {
      await setDoc(doc(db, "settings", "plan_prices"), {
        proPrice: tempPrices.pro,
        businessPrice: tempPrices.business,
        updated_at: new Date().toISOString()
      });
      setPlanPrices(tempPrices);
      setEditingPrices(false);
      toast.success("Plan prices updated!");
    } catch (err) {
      toast.error("Failed to save prices");
    }
  };

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

  const approveAd = async (adId, adData) => {
    try {
      await updateDoc(doc(db, "ads", adId), { 
        status: 'active',
        approved_at: new Date().toISOString()
      });
      toast.success("Ad approved and activated!");
      loadAds();
    } catch (err) {
      toast.error("Failed to approve ad");
    }
  };

  const rejectAd = async (adId) => {
    try {
      await updateDoc(doc(db, "ads", adId), { status: 'rejected' });
      toast.success("Ad rejected");
      loadAds();
    } catch (err) {
      toast.error("Failed to reject ad");
    }
  };

  const toggleAdStatus = async (adId, currentStatus) => {
    try {
      await updateDoc(doc(db, "ads", adId), { 
        status: currentStatus === 'active' ? 'paused' : 'active' 
      });
      toast.success(`Ad ${currentStatus === 'active' ? 'paused' : 'activated'}`);
      loadAds();
    } catch (err) {
      toast.error("Failed to update ad");
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
        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          <Card className="p-4 text-center border-none bg-white shadow-sm">
            <DollarSign size={16} className="mx-auto mb-2 text-green-600" />
            <div className="text-xl font-black font-mono">₦{adStats.revenue.toLocaleString()}</div>
            <div className="text-[8px] font-bold uppercase text-[var(--text-muted)]">Ad Revenue</div>
          </Card>
        </div>

        {/* Top Sellers */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <Trophy size={18} className="text-yellow-500" />
            <h2 className="font-display font-black uppercase text-[10px] tracking-widest text-[var(--text-muted)]">Top 5 Sellers</h2>
          </div>
          <div className="flex flex-col gap-2">
            {topSellers.map((seller, index) => (
              <Card key={seller.id} className="p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-slate-50 text-slate-600'
                }`}>
                  {index + 1}
                </div>
                <Avatar name={seller.store_display_name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{seller.store_display_name}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{seller.store_category || 'Store'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[var(--brand-primary)]">{seller.total_orders || 0} orders</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{seller.plan || 'basic'}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Products */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <ShoppingBag size={18} className="text-[var(--brand-primary)]" />
            <h2 className="font-display font-black uppercase text-[10px] tracking-widest text-[var(--text-muted)]">Top 5 Products</h2>
          </div>
          <div className="flex flex-col gap-2">
            {topProducts.map((product, index) => (
              <Card key={product.id} className="p-3 flex items-center gap-3">
                <div className="text-[10px] font-black text-[var(--text-muted)] w-4">{index + 1}</div>
                <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{product.name}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">₦{product.price?.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[var(--brand-primary)]">{product.order_count || 0} sold</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Plan Price Management */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-green-500" />
              <h2 className="font-display font-black uppercase text-[10px] tracking-widest text-[var(--text-muted)]">Plan Pricing</h2>
            </div>
            {!editingPrices ? (
              <button
                onClick={() => {
                  setTempPrices(planPrices);
                  setEditingPrices(true);
                }}
                className="text-xs font-bold text-[var(--brand-primary)] flex items-center gap-1"
              >
                <Save size={14} /> Edit Prices
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingPrices(false);
                    setTempPrices(planPrices);
                  }}
                  className="text-xs font-bold text-red-500 flex items-center gap-1"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  onClick={savePlanPrices}
                  className="text-xs font-bold text-green-600 flex items-center gap-1"
                >
                  <Save size={14} /> Save
                </button>
              </div>
            )}
          </div>
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block">
                  Pro Plan (₦/month)
                </label>
                {editingPrices ? (
                  <input
                    type="number"
                    value={tempPrices.pro}
                    onChange={(e) => setTempPrices({ ...tempPrices, pro: parseInt(e.target.value) || 0 })}
                    className="w-full h-12 rounded-lg border-2 border-[var(--border-default)] bg-white px-3 text-lg font-mono font-bold outline-none focus:border-green-500"
                  />
                ) : (
                  <div className="text-2xl font-mono font-black text-green-700">₦{planPrices.pro.toLocaleString()}</div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block">
                  Business Plan (₦/month)
                </label>
                {editingPrices ? (
                  <input
                    type="number"
                    value={tempPrices.business}
                    onChange={(e) => setTempPrices({ ...tempPrices, business: parseInt(e.target.value) || 0 })}
                    className="w-full h-12 rounded-lg border-2 border-[var(--border-default)] bg-white px-3 text-lg font-mono font-bold outline-none focus:border-green-500"
                  />
                ) : (
                  <div className="text-2xl font-mono font-black text-green-700">₦{planPrices.business.toLocaleString()}</div>
                )}
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              💡 These prices are shown on the Pricing page. Users will see updated prices immediately.
            </p>
          </Card>
        </section>

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

        {/* Ads Management */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <Megaphone size={18} className="text-purple-500" />
            <h2 className="font-display font-black uppercase text-[10px] tracking-widest text-[var(--text-muted)]">Advertisement Management</h2>
          </div>
          
          {/* Ad Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card className="p-3 text-center bg-purple-50 border-purple-100">
              <Megaphone size={14} className="mx-auto mb-1 text-purple-600" />
              <div className="text-lg font-black font-mono text-purple-700">{adStats.totalAds}</div>
              <div className="text-[8px] font-bold uppercase text-purple-600">Total Ads</div>
            </Card>
            <Card className="p-3 text-center bg-green-50 border-green-100">
              <CheckCircle size={14} className="mx-auto mb-1 text-green-600" />
              <div className="text-lg font-black font-mono text-green-700">{adStats.activeAds}</div>
              <div className="text-[8px] font-bold uppercase text-green-600">Active</div>
            </Card>
            <Card className="p-3 text-center bg-blue-50 border-blue-100">
              <DollarSign size={14} className="mx-auto mb-1 text-blue-600" />
              <div className="text-lg font-black font-mono text-blue-700">₦{adStats.revenue.toLocaleString()}</div>
              <div className="text-[8px] font-bold uppercase text-blue-600">Revenue</div>
            </Card>
          </div>

          {/* Pending Ads */}
          {activeAds.length === 0 && (
            <Card className="p-6 text-center text-[var(--text-muted)]">
              <Megaphone size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold">No active ads</p>
            </Card>
          )}

          <div className="flex flex-col gap-3">
            {activeAds.map(ad => (
              <Card key={ad.id} className="p-4 border-l-4 border-l-purple-500">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm">{ad.store_name || 'Unknown Store'}</h4>
                      <Badge variant={ad.status === 'active' ? 'success' : ad.status === 'paused' ? 'muted' : 'error'}>
                        {ad.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">{ad.description}</p>
                    <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {ad.duration || 0} days
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} /> ₦{ad.amount?.toLocaleString()}
                      </span>
                      <span className={ad.payment_status === 'paid' ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>
                        {ad.payment_status === 'paid' ? '✓ Paid' : '⏳ Pending Payment'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {ad.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveAd(ad.id, ad)}
                          className="px-3 py-1.5 bg-green-600 text-white text-[10px] font-black uppercase rounded-lg"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectAd(ad.id)}
                          className="px-3 py-1.5 bg-red-100 text-red-600 text-[10px] font-black uppercase rounded-lg"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {ad.status === 'active' && (
                      <button
                        onClick={() => toggleAdStatus(ad.id, 'active')}
                        className="px-3 py-1.5 bg-orange-100 text-orange-600 text-[10px] font-black uppercase rounded-lg"
                      >
                        Pause
                      </button>
                    )}
                    {ad.status === 'paused' && (
                      <button
                        onClick={() => toggleAdStatus(ad.id, 'paused')}
                        className="px-3 py-1.5 bg-green-100 text-green-600 text-[10px] font-black uppercase rounded-lg"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </PageWrapper>
    </AppShell>
  );
}
