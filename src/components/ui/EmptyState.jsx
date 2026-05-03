import { motion } from 'framer-motion';

export default function EmptyState({ title, description, icon: Icon, action }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]"
    >
      <div className="w-20 h-20 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full flex items-center justify-center mb-6">
        <Icon size={40} />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] max-w-xs mb-8">
        {description}
      </p>
      {action}
    </motion.div>
  );
}
