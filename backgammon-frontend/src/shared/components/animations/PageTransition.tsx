/**
 * Page Transition Animation Component
 * کامپوننت انیمیشن تبدیل صفحات - بدون هاردکد
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
  direction?: 'horizontal' | 'vertical';
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionKey,
  direction = 'horizontal',
  duration = 0.4,
}) => {
  const horizontalVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const verticalVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const variants = direction === 'horizontal' ? horizontalVariants : verticalVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ duration, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
