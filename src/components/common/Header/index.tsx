'use client';

import { useRouter } from 'next/navigation';

import cn from '@utils/cn';
import LeftArrow from 'public/assets/icon24/left_arrow_24.svg';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  const { back } = useRouter();

  const handleClickBackButton = () => {
    back();
  };

  return (
    <div
      className={cn(
        'flex items-center px-[16px] py-[8px] w-full h-[56px]',
        className,
      )}
    >
      <button className="w-[40px] h-[40px]" onClick={handleClickBackButton}>
        <LeftArrow />
      </button>
      {/* NOTE: 저희 서비스에서는 텍스트 혹은 search input이 들어갑니다. Header 컴포넌트 내부에 넣어주시면 됩니다. */}
      {children}
    </div>
  );
}
