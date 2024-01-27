'use client';

import { ButtonHTMLAttributes } from 'react';

import CTAButton from '@components/common/CTAButton';
import cn from '@utils/cn';
import SearchIcon from 'public/assets/icon24/search_24.svg';

export default function SearchField({
  onClick,
  className,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const handleSearchButtonClick = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    onClick?.(e);
  };

  return (
    <CTAButton
      onClick={handleSearchButtonClick}
      className={cn(
        'justify-between text-gray-500 body-14-regular bg-white active:bg-white shadow-search',
        className,
      )}
      {...restProps}
    >
      <p>맛집을 검색하세요</p>
      <SearchIcon />
    </CTAButton>
  );
}
