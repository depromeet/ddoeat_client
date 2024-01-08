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
