'use client';

import { ButtonHTMLAttributes } from 'react';

import { PinIcon } from './PinIcon';

import cn from '@utils/cn';

interface MarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBookmarked: boolean;
  totalVisitCount: number;
}

export default function Marker({ isBookmarked, totalVisitCount }: MarkerProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-[56px] h-[56px] rounded-[50%] bg-white shadow-pin`}
    >
      <div
        className={cn(
          'flex flex-col justify-center items-center w-[53px] h-[53px] rounded-[50%] bg-white',
          { 'bg-primary-300': isBookmarked },
        )}
      >
        <PinIcon
          isBookmarked={isBookmarked}
          totalVisitCount={totalVisitCount}
        />
      </div>
    </div>
  );
}
