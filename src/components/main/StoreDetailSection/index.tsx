import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Report from './Report';
import Reviews from './Reviews';
import StoreInformation from '../StoreInformation';
import { SearchedPinFromSearchParams } from '../StorePreviewSection';

import Header from '@components/common/Header';
import ImageContainer from '@components/common/ImageContainer';
import { useGetReport } from '@hooks/api/useGetReport';
import useObserver from '@hooks/useObserver';
import cn from '@utils/cn';
import useGetStore from '@hooks/api/useGetStore';

export default function StoreDetailSection({
  storeId,
  searchedPinFromSearchParams,
}: {
  storeId?: number;
  searchedPinFromSearchParams: SearchedPinFromSearchParams | null;
}) {
  const searchParams = useSearchParams();
  const { data: storeData } = useGetStore({
    storeId: storeId ?? (Number(searchParams.get('storeId')) || undefined),
  });

  const { data: reportData } = useGetReport(storeId ?? null);

  const [isScrollDown, setIsScrollDown] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    setIsScrollDown(!entry.isIntersecting);
  };

  const { setTarget } = useObserver({
    onIntersect,
  });

  return (
    <div>
      <div ref={setTarget}>
        <Header
          className={cn('fixed bg-white', {
            '[&>*>*]:fill-white': reportData?.storeMainImageUrl,
          })}
        >
          {isScrollDown && <span>{'음식점 이름 들어가는 자리입니다.'}</span>}
        </Header>
      </div>
      {reportData?.storeMainImageUrl && (
        <ImageContainer
          type="medium"
          src={reportData.storeMainImageUrl}
          alt="음식점 이미지"
        />
      )}
      <div
        className={cn('w-full', {
          'h-[24px] rounded-t-[24px]': reportData?.storeMainImageUrl,
          'h-[56px]': !reportData?.storeMainImageUrl,
        })}
      />
      <StoreInformation
        categoryName={
          storeData?.categoryName ??
          searchedPinFromSearchParams?.kakaoCategoryName ??
          ''
        }
        storeName={
          storeData?.storeName ?? searchedPinFromSearchParams?.storeName ?? ''
        }
        address={
          storeData?.address ?? searchedPinFromSearchParams?.address ?? ''
        }
        totalRating={storeData?.totalRating ?? 0}
        totalReviewCount={storeData?.totalReviewCount ?? 0}
        myRevisitedCount={storeData?.myRevisitedCount ?? 0}
      />
      <div className="w-full h-[8px] bg-gray-100" />
      <Report />
      <Reviews />
    </div>
  );
}
