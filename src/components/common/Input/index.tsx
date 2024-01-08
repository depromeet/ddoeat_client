import { ComponentProps, ReactNode, Ref, forwardRef } from 'react';

import cn from '@utils/cn';

interface InputProps extends ComponentProps<'input'> {
  rightItem?: ReactNode;
}

const Input = forwardRef(function Input(
  { rightItem, className, ...restProps }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div
      className={cn(
        'body-14-regular w-full h-[52px] flex items-center bg-white rounded-[24px] p-[16px]',
        className,
      )}
    >
      <input
        ref={ref}
        {...restProps}
        className="outline-none placeholder:gray-500 focus:placeholder:text-gray-300 caret-primary-500 w-full bg-transparent"
      />
      {rightItem}
    </div>
  );
});

export default Input;
