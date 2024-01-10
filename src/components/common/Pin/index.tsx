'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import PinBubble from './PinBubble';
import Tag from '../Tag';

import Marker from '@components/common/Pin/Marker';

import PinVisitorIcon from '/public/assets/icon20/pin_visitor_20.svg';

interface PinProps {
  storeName: string;
  isBookmarked: boolean;
  totalVisitCount: number;
}

export default function Pin({
  storeName,
  isBookmarked,
  totalVisitCount,
}: PinProps) {
  const [isActive, setIsActive] = useState(false);

  const handlePinClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {isActive && <PinBubble totalVisitCount={totalVisitCount} />}
      </AnimatePresence>
      <button onClick={handlePinClick} className="flex flex-col items-center">
        <Marker isBookmarked={isBookmarked} totalVisitCount={totalVisitCount} />
        <p className="body-14-extraBold text-gray-900 text-shadow-stroke mt-[4px]">
          {storeName}
        </p>
        {!isActive && (
          <Tag
            size={'small'}
            className="caption-12-bold px-[4px] rounded-[20px] bg-gray-700 text-gray-50 gap-0"
          >
            <PinVisitorIcon />
            <span className="caption-12-extraBold text-gray-50">
              {totalVisitCount}
            </span>
            명
          </Tag>
        )}
      </button>
    </div>
  );
}
