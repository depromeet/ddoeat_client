'use client';

import { ReactNode } from 'react';

interface TabHeaderProps {
  children: ReactNode;
}

export default function TabHeader({ children }: TabHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ul className="flex">{children}</ul>
    </div>
  );
}
