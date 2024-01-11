'use client';

import { AnimatePresence } from 'framer-motion';
import { type ComponentProps } from 'react';

import Portal, { PortalProps } from '../Portal';

export interface AnimatePortalProps extends PortalProps {
  isShowing: boolean;
  mode?: ComponentProps<typeof AnimatePresence>['mode'];
}

export default function AnimatePortal({
  isShowing,
  mode = 'wait',
  children,
  ...restProps
}: AnimatePortalProps) {
  return (
    <Portal {...restProps}>
      <AnimatePresence mode={mode}>{isShowing && children}</AnimatePresence>
    </Portal>
  );
}
