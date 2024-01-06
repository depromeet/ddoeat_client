'use client';

import { PropsWithChildren, type ComponentProps } from 'react';
import { AnimatePresence } from 'framer-motion';

import Portal from '../Portal';

export interface AnimatePortalProps extends PropsWithChildren {
  isShowing: boolean;
  mode?: ComponentProps<typeof AnimatePresence>['mode'];
}

export default function AnimatePortal({
  isShowing,
  children,
  mode = 'wait',
}: AnimatePortalProps) {
  return (
    <Portal>
      <AnimatePresence mode={mode}>{isShowing && children}</AnimatePresence>
    </Portal>
  );
}
