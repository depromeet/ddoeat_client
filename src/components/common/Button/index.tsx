import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';

import cn from '@utils/cn';

const Button = (
  {
    children,
    type = 'button',
    className,
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={cn(
        'p-[16px] h-[56px] rounded-[24px] flex flex-row gap-[8px] items-center justify-center text-white body-14-bold bg-primary-500 active:bg-primary-300 disabled:bg-gray-300',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
