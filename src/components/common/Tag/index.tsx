import { ComponentProps, ReactNode } from 'react';

import cn from '@utils/cn';

interface TagProps extends ComponentProps<'div'> {
  leftItem?: ReactNode;
}

export default function Tag({ children, className, leftItem }: TagProps) {
  return (
    <div className="flex">
      <div
        className={cn(
          'flex justify-items items-center justify-between gap-[4px] h-[32px] rounded-[32px] px-[12px] py-[4px] caption-12-bold text-white bg-primary-300',
          className,
        )}
      >
        {leftItem}
        {children}
      </div>
    </div>
  );
}
