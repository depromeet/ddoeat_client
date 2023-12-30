'use client';

import { useRouter } from 'next/navigation';

import Button from '../Button';

interface WriteLogButtonProps {
  storeId: string;
}

export default function WriteLogButton({ storeId }: WriteLogButtonProps) {
  const router = useRouter();

  const handleWriteLogButtonClick = () => {
    // TODO: 로그 작성 화면으로 보내기
    router.push(`someAddress=${storeId}`);
  };

  return (
    <Button
      onClick={handleWriteLogButtonClick}
      className="w-full gap-[6px] bg-gray-900"
    >
      <span>로그 작성</span>
      {/* TODO:아이콘이 확정되지 않아 더미 div로 대체. 아이콘 확정시 변경하기 */}
      <div className="w-[24px] h-[24px] bg-primary-500" />
    </Button>
  );
}
