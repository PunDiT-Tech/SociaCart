export const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { opacity: 0, y: -10, filter: 'blur(2px)',
    transition: { duration: 0.2 }
  },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const cardItem = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
};

export const slideUp = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } },
  exit:    { y: '100%', transition: { duration: 0.25 } },
};

export const scalePop = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }
  },
};
