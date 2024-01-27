import { PanInfo, motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { useBottomSheet } from '../contexts/BottomSheetContext';
import { BottomSheetProps, BottomSheetStatus } from '../types/types';

import useObserver from '@hooks/useObserver';
import cn from '@utils/cn';
import { bottomSheetAnimationVariants } from 'src/constants/motions';

export const HANDLE_HEIGHT = 24;
const DRAG_SAFE_DISTANCE = 50;

export default function BottomSheetWrapper({
  isShowing,
  onCloseBottomSheet,

  hasHandleBar = true,
  children,
}: Omit<BottomSheetProps, 'mode'>) {
  const {
    status,
    setStatus,
    deviceHeight,
    showStatusChildrenHeight,
    fullStatusChildrenHeight,
  } = useBottomSheet();

  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimationControls();

  const isFull = status === 'full';
  const isShow = status === 'show';
  const isOverScrolled = isFull && isScrolled;

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    setIsScrolled(!entry.isIntersecting);
  };

  const { setTarget } = useObserver({
    onIntersect,
  });

  const changeStatus = useCallback(
    async (willChange: BottomSheetStatus) => {
      setStatus(willChange);
      //TODO: shallow route
      await controls.start(willChange);
    },
    [controls, setStatus],
  );

  useEffect(() => {
    if (isShowing && deviceHeight && showStatusChildrenHeight) {
      controls.start('show');
      changeStatus('show');
    }
  }, [
    isShowing,
    controls,
    changeStatus,
    deviceHeight,
    showStatusChildrenHeight,
  ]);

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    const {
      offset: { y: distanceFromStartY },
      velocity: { y: velocityY },
    } = info;

    const dragDown = velocityY > 0;
    const dragUp = velocityY < 0;

    const lowerThanStartY =
      distanceFromStartY > (isFull ? 0 : DRAG_SAFE_DISTANCE);
    const higherThanStartY = distanceFromStartY < -DRAG_SAFE_DISTANCE;

    const shouldDown = dragDown && lowerThanStartY;
    const shouldUp = dragUp && higherThanStartY;

    if (isFull) {
      if (isScrolled) return;

      if (shouldDown) {
        changeStatus('show');
        return;
      }

      if (lowerThanStartY) {
        changeStatus('full');
        return;
      }

      return;
    }

    if (isShow) {
      if (shouldUp) {
        changeStatus('full');
        return;
      }

      if (shouldDown) {
        onCloseBottomSheet();
        return;
      }
    }

    changeStatus(status);
  };

  return (
    isShowing &&
    deviceHeight && (
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden pointer-events-none z-overlay">
        <motion.div
          variants={bottomSheetAnimationVariants}
          drag={'y'}
          onDragEnd={handleDragEnd}
          dragConstraints={{
            top: isFull ? deviceHeight - fullStatusChildrenHeight : 0,
            bottom: isOverScrolled ? 0 : deviceHeight,
          }}
          animate={controls}
          initial="hidden"
          exit="hidden"
          custom={deviceHeight - showStatusChildrenHeight}
          className={cn(
            'pointer-events-auto absolute left-0 top-0 h-[100dvh] w-full bg-white rounded-t-[24px]',
            {
              'rounded-none h-fit': isFull,
            },
          )}
        >
          {hasHandleBar && isShow && (
            <div
              className={`flex items-center justify-center h-[${HANDLE_HEIGHT}px]`}
            >
              <div className="w-[56px] h-[6px] rounded-[32px] shrink-0 bg-gray-300" />
            </div>
          )}
          {isFull && <div ref={setTarget} className="w-full h-[0px]" />}
          {children}
        </motion.div>
      </div>
    )
  );
}
