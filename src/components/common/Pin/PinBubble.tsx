'use client';

import { AnimatePresence, motion } from 'framer-motion';

import PinVisitorIcon from '/public/assets/icon20/pin_visitor_20.svg';
import ArrowIcon from '/public/assets/icon30/polygon_30.svg';

import { bounceAnimationVariants } from '@constants/motions';

interface PinBubbleProps {
  totalVisitCount: number;
}

export default function PinBubble({ totalVisitCount }: PinBubbleProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={bounceAnimationVariants}
        animate="animate"
        initial="initial"
        exit="exit"
        className="absolute top-[-60px] flex flex-col justify-center items-center"
      >
        <div className="inline-flex h-[36px] flex justify-center items-center bg-primary-500 px-[12px] py-[8px] rounded-[16px] mb-[-8px]">
          <PinVisitorIcon />
          <p className="body-14-extraBold text-white">
            {totalVisitCount}명이 재방문했어요!
          </p>
        </div>
        <ArrowIcon />
      </motion.div>
    </AnimatePresence>
  );
}
