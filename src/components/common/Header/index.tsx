'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

import cn from '@utils/cn';
import LeftArrow from 'public/assets/icon24/left_arrow_24.svg';

export default function Header({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLHeadElement>) {
  const { back } = useRouter();

  const handleClickBackButton = () => {
    back();
  };

  return (
    <header
      className={cn(
        'fixed top-0 flex items-center px-[16px] py-[8px] w-full max-w-[480px]',
        className,
      )}
      {...restProps}
    >
      <button className="w-[40px] h-[40px]" onClick={handleClickBackButton}>
        <LeftArrow />
      </button>
      {/* NOTE: 저희 서비스에서는 텍스트 혹은 search input이 들어갑니다. Header 컴포넌트 내부에 넣어주시면 됩니다. */}
      {children}
    </header>
  );
}
