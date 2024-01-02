'use client';

import PinVisitor from '/public/assets/icon20/pin_visitor_20.svg';
import Polygon from '/public/assets/icon30/polygon_30.svg';

interface PinBubbleProps {
  totalVisitCount: number;
}

export default function PinBubble({ totalVisitCount }: PinBubbleProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[167px] h-[36px] flex justify-center items-center bg-primary-500 px-[12px] py-[8px] rounded-[16px] mb-[-8px]">
        <PinVisitor />
        <span className="body-14-extraBold text-white">
          {totalVisitCount}명이 재방문했어요!
        </span>
      </div>
      <Polygon />
    </div>
  );
}
