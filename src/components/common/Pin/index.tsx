import { AnimatePresence } from 'framer-motion';

import PinBubble from './PinBubble';
import { PinIcon } from './PinIcon';

export interface PinProps {
  isActive: boolean;
  storeName: string;
  isBookmarked: boolean;
  totalRevisitedCount: number;
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  mapLevel: number;
}

export default function Pin({
  isActive,
  storeName,
  isBookmarked,
  totalRevisitedCount,
  onClick,
  mapLevel,
}: PinProps) {
  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {isActive && <PinBubble totalRevisitedCount={totalRevisitedCount} />}
      </AnimatePresence>
      <button
        onClick={onClick}
        className="relative h-fit flex flex-col items-center transition-all"
      >
        <PinIcon
          mapLevel={mapLevel}
          isBookmarked={isBookmarked}
          totalRevisitedCount={totalRevisitedCount}
        />
        {mapLevel < 5 && (
          <p className="body-14-extraBold text-gray-900 text-shadow-stroke absolute top-[90%]">
            {storeName}
          </p>
        )}
      </button>
    </div>
  );
}
