import { X, Plus, Minus, ShoppingCart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import Button from '../ui/Button';

export default function CartModal({ isOpen, onClose, onCheckout, storeName }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-[var(--border-default)] p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--brand-primary)]/10 rounded-full flex items-center justify-center">
              <ShoppingCart size={20} className="text-[var(--brand-primary)]" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg">Your Cart</h2>
              <p className="text-xs text-[var(--text-muted)]">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--surface-bg)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-bold">Your cart is empty</p>
              <p className="text-sm mt-1">Add products to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-3 p-3 bg-[var(--surface-bg)] rounded-xl"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{item.name}</h3>
                    <p className="text-[var(--brand-primary)] font-mono font-black mt-1">
                      {formatPrice(item.price, item.currency || '₦')}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-[var(--border-default)]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-[var(--border-default)]"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-xs font-bold text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-[var(--border-default)] p-4 space-y-3">
            <div className="flex items-center justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-mono font-black text-[var(--brand-primary-dark)]">
                {formatPrice(cartTotal, '₦')}
              </span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full gap-2 py-4"
              onClick={onCheckout}
            >
              <MessageCircle size={20} />
              <span className="font-black uppercase tracking-[0.1em] text-xs">Checkout via WhatsApp</span>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
