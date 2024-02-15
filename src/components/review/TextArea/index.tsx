'use client';

import { ChangeEvent, ComponentProps, useCallback } from 'react';

import cn from '@utils/cn';

export default function TextArea({
  value,
  onChange,
  maxLength = 300,
  className,
  ...restProps
}: ComponentProps<'textarea'>) {
  const currentTextCount = String(value ?? '').length;

  const handleTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && currentTextCount > maxLength) return;

      onChange?.(e);
    },
    [maxLength, onChange, currentTextCount],
  );

  return (
    <div
      className={cn(
        'body-14-regular flex flex-col w-full h-[216px] bg-white rounded-[24px] p-[16px] gap-[4px]',
        className,
      )}
    >
      <textarea
        {...restProps}
        value={value}
        onChange={handleTextAreaChange}
        maxLength={maxLength}
        className="w-full h-full resize-none outline-none placeholder:gray-500 focus:placeholder:text-gray-300 caret-primary-500 break-all"
      />
      <div className="w-full flex gap-[4px] justify-end">
        <span>{currentTextCount}</span>
        <span className="text-gray-500">/{maxLength}</span>
      </div>
    </div>
  );
}
