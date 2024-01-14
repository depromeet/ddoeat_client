'use client';

import { Variants } from 'framer-motion';

export const bottomSheetAnimationVariants: Variants = {
  hidden: { y: '100%', transition: { duration: 0.2 } },
  show: (defaultHeight) => ({
    y: `${defaultHeight}px`,
    transition: { duration: 0.2 },
  }),

  full: { y: 0, transition: { duration: 0.2 } },
};

export const bounceAnimationVariants: Variants = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: {
    y: ['20%', '0%', '20%'],
    transition: {
      bounce: 0.25,
      duration: 1,
      repeat: Infinity,
    },
  },
  opacity: { opacity: 1, transition: { duration: 0.2 } },
};

export const pageTransitionVariant: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: { duration: 0.5 },
  },
  opacity: { opacity: 1, transition: { duration: 0.2 } },
};

export const defaultFadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 5,
    transition: { duration: 0.3 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};
