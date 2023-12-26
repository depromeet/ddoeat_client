'use client';

import { ReactNode } from 'react';

import { useTab } from './TabGroup';

import cn from '@utils/cn';

export interface TabItemProps {
  value: string;
  children: ReactNode;
}

export function TabItem({ value, children }: TabItemProps) {
  const { activeValue, setActiveValue } = useTab();
  const isActive = value === activeValue;

  return (
    <li
      className={cn(
        'header-18 text-gray-900 w-[72px] h-[32px] flex justify-center items-center border-b-[4px]',
        isActive ? ' border-primary-500' : 'border-transparent',
      )}
      onClick={() => setActiveValue(value)}
    >
      {children}
    </li>
  );
}
