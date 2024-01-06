import { HTMLAttributes } from 'react';

import cn from '@utils/cn';

export default function Report({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-[168px] h-[130px] bg-primary-300 rounded-[24px] text-white flex flex-col justify-end items-center ',
        className,
      )}
    >
      {children}
    </div>
  );
}
