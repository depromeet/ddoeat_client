import { createContext, useState, useContext, ReactNode } from 'react';

interface TabContextProps {
  activeValue: string | null;
  setActiveValue: (value: string) => void;
}

const TabContext = createContext<TabContextProps | null>(null);

interface TabGroupProps {
  children: ReactNode;
  initialTab?: string | null;
}

export function TabGroup({ children, initialTab = null }: TabGroupProps) {
  const [activeValue, setActiveValue] = useState(initialTab);

  return (
    <TabContext.Provider value={{ activeValue, setActiveValue }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTab must be used within a TabGroup');
  }

  return context;
}
