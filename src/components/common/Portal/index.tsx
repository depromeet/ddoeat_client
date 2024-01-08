'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps extends PropsWithChildren {
  customContainer?: Element | null;
}

export default function Portal({ customContainer, children }: PortalProps) {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    if (customContainer) {
      setContainer(customContainer);
      return;
    }

    if (document?.body) {
      setContainer(document.body);
    }
  }, [customContainer]);

  if (!container) return null;

  return createPortal(children, container);
}
