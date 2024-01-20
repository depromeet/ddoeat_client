import { AnimatePresence } from 'framer-motion';

import Tag from '../Tag';
import PinBubble from './PinBubble';

import Marker from '@components/common/Pin/Marker';

import PinVisitorIcon from '/public/assets/icon20/pin_visitor_20.svg';

export interface PinProps {
  isActive: boolean;
  storeName: string;
  isBookmarked: boolean;
  totalVisitCount: number;
  onClick: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export default function Pin({
  isActive,
  storeName,
  isBookmarked,
  totalVisitCount,
  onClick,
}: PinProps) {
  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {isActive && <PinBubble totalVisitCount={totalVisitCount} />}
      </AnimatePresence>
      <button onClick={onClick} className="flex flex-col items-center">
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
