'use client';

import { ReactNode } from 'react';

import { useTab } from './TabGroup';

import cn from '@utils/cn';

interface TabItemProps {
  value: string;
  children: ReactNode;
}

export default function TabItem({ value, children }: TabItemProps) {
  const { activeValue, setActiveValue } = useTab();
  const isActive = value === activeValue;

  const handleTabItemClick = () => setActiveValue(value);

  return (
    <div className="grow">
      <li
        className={cn(
          'w-full header-18 text-gray-900 h-[32px] flex justify-center items-center border-b-[4px] border-transparent',
        )}
        onClick={handleTabItemClick}
      >
        {children}
      </li>
      <div
        className={cn('w-full h-[2px] rounded-[32px]', {
          'bg-gray-100': !isActive,
          'bg-primary-500': isActive,
        })}
      />
    </div>
  );
}
