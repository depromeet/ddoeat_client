'use client';

import { motion } from 'framer-motion';

import PinVisitorIcon from '/public/assets/icon20/pin_visitor_20.svg';
import ArrowIcon from '/public/assets/icon30/polygon_30.svg';

import { useSearchParams } from 'next/navigation';

import { bounceAnimationVariants } from '@constants/motions';

interface PinBubbleProps {
  totalRevisitedCnt: number;
}

export default function PinBubble({ totalRevisitedCnt }: PinBubbleProps) {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId');

  return (
    <motion.div
      variants={bounceAnimationVariants}
      animate={['animate', 'opacity']}
      initial="initial"
      exit="exit"
      className="absolute top-[-60px] flex flex-col justify-center items-center z-floating"
    >
      <div className="h-[36px] flex justify-center items-center bg-primary-500 px-[12px] py-[8px] rounded-[16px] mb-[-8px]">
        {storeId && <PinVisitorIcon />}
        <p className="body-14-extraBold text-white">
          {storeId
            ? `${totalRevisitedCnt}명이 재방문했어요!`
            : '첫 방문 기록을 남겨주세요!'}
        </p>
      </div>
      <ArrowIcon />
    </motion.div>
  );
}
