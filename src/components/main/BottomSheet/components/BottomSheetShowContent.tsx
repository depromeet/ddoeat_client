import { motion } from 'framer-motion';
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';

import { useBottomSheet } from '../contexts/BottomSheetContext';

import CurrentLocationButton from '@components/main/CurrentLocationButton';
import { currentLocationButtonFadeInOutVariants } from '@constants/motions';
import useResizeObserver from '@hooks/useResizeObserver';
import mergeRefs from '@utils/mergeRefs';
import useMutationObserver from '@hooks/useMutationObserver';

interface BottomSheetShowContentProps {
  onCurrentLocationButtonClick?: () => void;
}

export default function BottomSheetShowContent({
  onCurrentLocationButtonClick,
  children,
}: PropsWithChildren<BottomSheetShowContentProps>) {
  const showStatusChildrenRef = useRef<HTMLDivElement>(null);
  const { status, setShowStatusChildrenHeight } = useBottomSheet();

  useMutationObserver(showStatusChildrenRef, () => {
    showStatusChildrenRef.current &&
      setShowStatusChildrenHeight(showStatusChildrenRef.current.offsetHeight);
  });

  const onResize = useCallback(
    (target: HTMLDivElement) => {
      setShowStatusChildrenHeight(target.offsetHeight);
    },
    [setShowStatusChildrenHeight],
  );

  const resizeRef = useResizeObserver(onResize);

  useEffect(() => {
    if (showStatusChildrenRef.current) {
      setShowStatusChildrenHeight(showStatusChildrenRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    status,
    showStatusChildrenRef,
    showStatusChildrenRef.current,
    setShowStatusChildrenHeight,
  ]);

  const isShow = status === 'show';

  return isShow ? (
    <div className="relative" ref={mergeRefs(showStatusChildrenRef, resizeRef)}>
      <motion.div
        className="absolute top-[-98px] left-[16px]"
        variants={currentLocationButtonFadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <CurrentLocationButton
          onCurrentLocationButtonClick={
            onCurrentLocationButtonClick || (() => {})
          }
        />
      </motion.div>
      {children}
    </div>
  ) : null;
}
