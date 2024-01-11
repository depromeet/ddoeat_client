'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

import CTAButton from '@components/common/CTAButton';
import SearchIcon from 'public/assets/icon24/search_24.svg';
import cn from '@utils/cn';

export default function SearchField({
  onClick,
  className,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();

  const handleSearchButtonClick = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    onClick?.(e);
    // TODO: 검색 페이지로 이동 시키기
    router.push('/search');
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
