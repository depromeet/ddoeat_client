import React, { HTMLAttributes } from 'react';

import cn from '@utils/cn';

export default function MyPageFeedContainer({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-full flex flex-col gap-[8px] px-[20px] py-[24px] bg-gray-50 rounded-[24px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
