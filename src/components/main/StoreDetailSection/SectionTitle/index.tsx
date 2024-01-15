import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-[52px] py-[16px]">
      <div className="body-14-bold">{children}</div>
    </div>
  );
}
