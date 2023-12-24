import { ComponentProps, ReactNode, Ref, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  rightItem?: ReactNode;
}

const Input = forwardRef(function Input(
  { rightItem, ...restProps }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className="body-14-regular w-full flex items-center bg-white rounded-[24px] p-[16px]">
      <input
        ref={ref}
        {...restProps}
        className="outline-none placeholder:gray-500 focus:placeholder:text-gray-300 caret-primary-500 w-full"
      />
      {rightItem}
    </div>
  );
});

export default Input;
