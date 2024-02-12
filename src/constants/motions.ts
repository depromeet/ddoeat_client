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
    opacity: 0,
    transition: { duration: 0.5 },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
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

export const mapTranslateYAnimationVariants: Variants = {
  bottomSheetOpen: { y: '-7%', transition: { bounce: 0, duration: 0.2 } },
  bottomSheetClosed: { y: 0, transition: { bounce: 0, duration: 0.2 } },
};

export const currentLocationButtonFadeInOutVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};
