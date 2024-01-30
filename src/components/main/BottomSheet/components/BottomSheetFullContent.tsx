import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useBottomSheet } from '../contexts/BottomSheetContext';

import useResizeObserver from '@hooks/useResizeObserver';
import mergeRefs from '@utils/mergeRefs';
import useMutationObserver from '@hooks/useMutationObserver';

export default function BottonSheetFullContent({
  children,
}: PropsWithChildren) {
  const fullStatusChildrenRef = useRef<HTMLDivElement>(null);
  const { status, setFullStatusChildrenHeight } = useBottomSheet();
  const [, forceUpdate] = useState({});

  useMutationObserver(fullStatusChildrenRef, () => {
    forceUpdate({});
  });

  const onResize = useCallback(
    (target: HTMLDivElement) => {
      setFullStatusChildrenHeight(target.offsetHeight);
    },
    [setFullStatusChildrenHeight],
  );

  const resizeRef = useResizeObserver(onResize);

  useEffect(() => {
    if (fullStatusChildrenRef.current) {
      setFullStatusChildrenHeight(fullStatusChildrenRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    status,
    fullStatusChildrenRef,
    fullStatusChildrenRef.current,
    setFullStatusChildrenHeight,
  ]);

  const isFull = status === 'full';

  return isFull ? (
    <div
      className="min-h-[100dvh]"
      ref={mergeRefs(fullStatusChildrenRef, resizeRef)}
    >
      {children}
    </div>
  ) : null;
}
