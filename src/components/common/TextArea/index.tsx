'use client';

import { ChangeEvent, ComponentProps, useState } from 'react';

export default function TextArea({
  onChange,
  maxLength = 400,
  ...restProps
}: ComponentProps<'textarea'>) {
  const [textCount, setTextCount] = useState(0);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentTextCount = e.target.value.length;

    if (maxLength && currentTextCount > maxLength) return;

    setTextCount(currentTextCount);
    onChange?.(e);
  };

  return (
    <div className="body-14-regular flex flex-col w-full h-[130px] bg-white rounded-[24px] p-[16px]">
      <textarea
        {...restProps}
        onChange={handleTextAreaChange}
        maxLength={maxLength}
        className="w-full h-full resize-none outline-none placeholder:gray-500 focus:placeholder:text-gray-300 caret-primary-500"
      />
      <div className="w-full flex gap-[4px] justify-end">
        <span>{textCount}</span>
        <span className="text-gray-500">/{maxLength}</span>
      </div>
    </div>
  );
}
