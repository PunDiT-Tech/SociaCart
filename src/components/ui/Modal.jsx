import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { slideUp } from '../../utils/animations';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-[101] bg-[var(--surface-bg)] rounded-t-[var(--radius-xl)] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-default)]">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[var(--border-default)] rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
