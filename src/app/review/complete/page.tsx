'use client';

import { useSearchParams } from 'next/navigation';

import DdobabWritingLogo from 'public/assets/ddobab/ddobab_writing.svg';
import FixedBottomCTAButton from '@components/common/FixedBottomCTAButton';

export default function Page() {
  const searchParams = useSearchParams();
  const storeName = searchParams.get('storeName');
  const totalRevisitedCount = searchParams.get('totalRevisitedCount');
  return (
    <div className="text-black h-[100dvh] w-full bg-gray-100 flex flex-col gap-[32px] justify-center items-center">
      <div>
        <h2 className="header-22 text-gray-900 text-center">
          {storeName}에 <br />{' '}
          <strong className="text-primary-500">
            {totalRevisitedCount}번째
          </strong>{' '}
          기록을 작성했어요!
        </h2>
        <p className="body-14-regular text-gray-700 mt-[8px]">
          내 기록은 마이페이지에서 확인할 수 있어요.
        </p>
      </div>
      <DdobabWritingLogo />
      <FixedBottomCTAButton>확인</FixedBottomCTAButton>
    </div>
  );
}
