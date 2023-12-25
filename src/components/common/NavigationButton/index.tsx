import { ButtonHTMLAttributes } from 'react';
import cn from '@utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function NavigationButton({
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'w-full p-[16px] h-[56px] rounded-[24px] text-center text-white text-[14px] font-bold',
        {
          'bg-primary-500 active:bg-primary-300': !props.disabled,
          'bg-gray-300': props.disabled,
        },
      )}
    >
      {children}
    </button>
  );
}
