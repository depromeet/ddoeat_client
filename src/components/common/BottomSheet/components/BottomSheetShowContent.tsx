import { PropsWithChildren, useEffect, useRef } from 'react';

import { useBottomSheet } from '../contexts/BottomSheetContext';

export default function BottonSheetShowContent({
  children,
}: PropsWithChildren) {
  const showStatusChildrenRef = useRef<HTMLDivElement>(null);
  const { status, setShowStatusChildrenHeight } = useBottomSheet();

  useEffect(() => {
    if (showStatusChildrenRef.current) {
      setShowStatusChildrenHeight(
        showStatusChildrenRef.current.getBoundingClientRect().height,
      );
    }
  }, [status, showStatusChildrenRef, showStatusChildrenRef.current]);

  const isShow = status === 'show';

  return isShow ? <div ref={showStatusChildrenRef}>{children}</div> : null;
}
