'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

import Button from '../Button';

import PenIcon from 'public/assets/icon20/pen_20.svg';
import cn from '@utils/cn';

interface WriteLogButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  storeId: string;
}

export default function WriteLogButton({
  storeId,
  className,
  ...restProps
}: WriteLogButtonProps) {
  const router = useRouter();

  const handleWriteLogButtonClick = () => {
    // TODO: 로그 작성 화면으로 보내기
    router.push(`someAddress=${storeId}`);
  };

  return (
    <Button
      onClick={handleWriteLogButtonClick}
      className={cn(
        'w-full gap-[6px] bg-gray-900 active:bg-gray-700 disabled:bg-gray-100 group',
        className,
      )}
      {...restProps}
    >
      <span className="group-disabled:text-gray-500">로그 작성</span>
      <PenIcon />
    </Button>
  );
}
