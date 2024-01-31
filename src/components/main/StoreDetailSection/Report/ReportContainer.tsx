import { HTMLAttributes } from 'react';

import cn from '@utils/cn';

export default function ReportContainer({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-1/2 min-w-fit h-[130px] bg-primary-300 rounded-[24px] text-white flex flex-col justify-end items-center ',
        className,
      )}
    >
      {children}
    </div>
  );
}
