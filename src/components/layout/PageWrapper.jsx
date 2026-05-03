import { motion } from 'framer-motion';
import { pageVariants } from '../../utils/animations';

export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full h-full p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}
