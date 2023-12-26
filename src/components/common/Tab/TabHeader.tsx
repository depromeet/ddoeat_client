'use client';

import { ReactElement, useEffect } from 'react';

import { useTab } from './TabGroup';
import { TabItemProps } from './TabItem';

interface TabHeaderProps {
  RightItem: ReactElement;
  children: ReactElement<TabItemProps>[];
}

export default function TabHeader({ RightItem, children }: TabHeaderProps) {
  const { activeValue, setActiveValue } = useTab();

  useEffect(() => {
    if (activeValue === '') {
      setActiveValue(children[0].props.value);
    }
  }, []);

  return (
    <div className="flex items-center justify-between">
      <ul className="flex">{children}</ul>
      <span className="w-[24px] h-[24px]">{RightItem}</span>
    </div>
  );
}
