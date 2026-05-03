import { ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export default function FloatingCartButton({ onClick }) {
  const { cartCount, cartTotal, setIsCartOpen } = useCart();

  if (cartCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 100 }}
        className="fixed bottom-24 right-6 z-40 flex flex-col gap-3"
      >
        {/* Cart Total Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black text-white px-4 py-2 rounded-xl shadow-lg"
        >
          <div className="text-[10px] font-black uppercase tracking-wider">Total</div>
          <div className="text-lg font-mono font-black">{formatPrice(cartTotal, '₦')}</div>
        </motion.div>

        {/* Checkout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="w-16 h-16 bg-[var(--brand-primary)] text-white rounded-full shadow-lg flex items-center justify-center relative"
        >
          <ShoppingCart size={28} strokeWidth={2.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
