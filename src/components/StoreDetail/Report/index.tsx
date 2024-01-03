import { ReactNode } from 'react';

interface ReportProps {
  children: ReactNode;
}

export default function Report({ children }: ReportProps) {
  return (
    <div className="w-[167.5px] h-[130px] bg-primary-300 rounded-[24px] text-white flex flex-col justify-end items-center ">
      {children}
    </div>
  );
}
