'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: PropsWithChildren) {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    if (document?.body) {
      setContainer(document.body);
    }
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}
