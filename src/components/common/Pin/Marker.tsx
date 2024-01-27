'use client';

import { ButtonHTMLAttributes } from 'react';

import { PinIcon } from './PinIcon';

import cn from '@utils/cn';

interface MarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBookmarked: boolean;
  totalRevisitedCount: number;
}

export default function Marker({
  isBookmarked,
  totalRevisitedCount,
}: MarkerProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center w-[44px] h-[44px] rounded-[50%] bg-white shadow-pin',
        { 'bg-primary-300 ring-inset ring-[2px] ring-white': isBookmarked },
      )}
    >
      <PinIcon
        isBookmarked={isBookmarked}
        totalRevisitedCount={totalRevisitedCount}
      />
    </div>
  );
}
