import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

import RefreshIcon from '/public/assets/icon16/refresh_16.svg';

import { currentLocationButtonFadeInOutVariants } from '@constants/motions';
import cn from '@utils/cn';

interface LoadPinListButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isShowing: boolean;
}

function LoadPinListButton({
  isShowing,
  className,
  ...restProps
}: LoadPinListButtonProps & HTMLMotionProps<'button'>) {
  return (
    <AnimatePresence>
      {isShowing && (
        <motion.button
          variants={currentLocationButtonFadeInOutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            'flex gap-[4px] h-[32px] py-[4px] px-[12px] bg-system-dim80 text-white rounded-[32px] justify-center items-center shadow-search',
            className,
          )}
          {...restProps}
        >
          <RefreshIcon />
          <span className="caption-12-bold">현 위치에서 검색</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default LoadPinListButton;
