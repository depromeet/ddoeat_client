'use client';

import { ChangeEvent, ComponentProps, useCallback } from 'react';

export default function TextArea({
  value,
  onChange,
  maxLength = 400,
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
    <div className="body-14-regular flex flex-col w-full h-[8.125rem] bg-white rounded-[1.5rem] p-[1rem]">
      <textarea
        {...restProps}
        value={value}
        onChange={handleTextAreaChange}
        maxLength={maxLength}
        className="w-full h-full resize-none outline-none placeholder:gray-500 focus:placeholder:text-gray-300 caret-primary-500"
      />
      <div className="w-full flex gap-[.25rem] justify-end">
        <span>{currentTextCount}</span>
        <span className="text-gray-500">/{maxLength}</span>
      </div>
    </div>
  );
}
