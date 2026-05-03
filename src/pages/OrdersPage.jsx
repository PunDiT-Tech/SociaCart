import { useState } from 'react';
import { ShoppingBag, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useOrders from '../hooks/useOrders';
import { updateOrderStatus } from '../services/orderService';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatPrice, formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const { orders, loading } = useOrders();
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const filteredOrders = orders.filter(o => 
    filter === 'all' ? true : o.status === filter
  );

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <AppShell>
      <TopBar title="Recent Orders" showBack={false} />
      
      <PageWrapper>
        {/* Filter Tabs */}
        <div className="flex bg-[var(--surface-card)] p-1 rounded-2xl border border-[var(--border-default)] mb-6 shadow-sm">
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all
                ${filter === f ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'text-[var(--text-muted)]'}
              `}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner className="mt-20" />
        ) : filteredOrders.length === 0 ? (
          <EmptyState 
            title="No orders found"
            description={filter === 'all' ? "Share your store link to start receiving orders on WhatsApp." : `You don't have any ${filter} orders yet.`}
            icon={ShoppingBag}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map(order => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card variant="flat" padding="none" className="overflow-hidden">
                    <div className="p-4 flex gap-4">
                      <img 
                        src={order.product_image} 
                        className="w-16 h-16 rounded-xl object-cover bg-[var(--surface-bg)]" 
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm truncate pr-2">{order.product_name}</h4>
                          <Badge variant={order.status === 'pending' ? 'warning' : order.status === 'completed' ? 'success' : 'error'}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-xs font-mono font-black text-[var(--brand-primary-dark)] mb-1">
                          {formatPrice(order.product_price, order.currency)}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tight">
                          <Clock size={10} />
                          {formatDate(order.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    {order.status === 'pending' && (
                      <div className="flex border-t border-[var(--border-default)]">
                        <button 
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                          className="flex-1 py-3 flex items-center justify-center gap-2 text-[10px] font-bold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5 transition-colors"
                        >
                          <CheckCircle2 size={14} /> Mark Completed
                        </button>
                        <div className="w-[1px] bg-[var(--border-default)]" />
                        <button 
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          className="flex-1 py-3 flex items-center justify-center gap-2 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </PageWrapper>
    </AppShell>
  );
}
