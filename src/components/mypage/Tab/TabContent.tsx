'use client';

import { ReactNode } from 'react';

import { useTab } from './TabGroup';

interface TabContentProps {
  value: string;
  children: ReactNode;
}

export default function TabContent({ value, children }: TabContentProps) {
  const { activeValue } = useTab();

  return activeValue === value && <div>{children}</div>;
}
