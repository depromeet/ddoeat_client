'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TabContextType {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

interface TabGroupProps {
  children: ReactNode;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function useTab(): TabContextType {
  const context = useContext(TabContext);

  if (!context) throw new Error('TabContext not found');

  return context;
}

export function TabGroup({ children }: TabGroupProps) {
  const [activeValue, setActiveValue] = useState('');

  return (
    <TabContext.Provider value={{ activeValue, setActiveValue }}>
      {children}
    </TabContext.Provider>
  );
}
