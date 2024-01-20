import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useRef } from 'react';

import { useBottomSheet } from '../contexts/BottomSheetContext';

import CurrentLocationButton from '@components/main/CurrentLocationButton';
import { currentLocationButtonFadeInOutVariants } from '@constants/motions';

interface BottonSheetShowContent {
  onCurrentLocationButtonClick: () => void;
}

export default function BottonSheetShowContent({
  onCurrentLocationButtonClick,
  children,
}: PropsWithChildren<BottonSheetShowContent>) {
  const showStatusChildrenRef = useRef<HTMLDivElement>(null);
  const { status, setShowStatusChildrenHeight } = useBottomSheet();

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
    <div className="relative" ref={showStatusChildrenRef}>
      <motion.div
        className="absolute top-[-98px] left-[16px]"
        variants={currentLocationButtonFadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <CurrentLocationButton onClick={onCurrentLocationButtonClick} />
      </motion.div>
      {children}
    </div>
  ) : null;
}
