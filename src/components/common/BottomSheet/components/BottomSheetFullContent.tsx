import { PropsWithChildren, useEffect, useRef } from 'react';

import { useBottomSheet } from '../contexts/BottomSheetContext';

export default function BottonSheetFullContent({
  children,
}: PropsWithChildren) {
  const fullStatusChildrenRef = useRef<HTMLDivElement>(null);
  const { status, setFullStatusChildrenHeight } = useBottomSheet();

  useEffect(() => {
    if (fullStatusChildrenRef.current) {
      setFullStatusChildrenHeight(
        fullStatusChildrenRef.current.getBoundingClientRect().height,
      );
    }
  }, [status, fullStatusChildrenRef, fullStatusChildrenRef.current]);

  const isFull = status === 'full';

  return isFull ? (
    <div className="min-h-[100dvh]" ref={fullStatusChildrenRef}>
      {children}
    </div>
  ) : null;
}
