import { HTMLAttributes } from 'react';

import cn from '@utils/cn';

export default function BottomNaviagtionButton({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex justify-center items-center w-[56px] h-[56px] rounded-[50%] bg-bottom-navigation-button border-gray-900 border-[1px] shadow-bottom-navigation-button',
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
