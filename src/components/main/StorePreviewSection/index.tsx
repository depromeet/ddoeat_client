import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import StoreInformation from '../StoreInformation';
import WriteLogButton from '../WriteLogButton';
import StoreLogPhotoPreview from './StoreLogPhotoPreview';

import BookmarkButton from '@components/common/BookmarkButton';
import useGetStore from '@hooks/api/useGetStore';
import switchUrl from '@utils/switchUrl';
import { CoordinateWithIds } from 'src/types/map';

export interface SearchedPinFromSearchParams {
  position: CoordinateWithIds;
  storeName: string;
  isBookmarked: boolean;
  totalRevisitedCount: number;
  address: string;
  categoryType: string;
  distance: number;
  kakaoCategoryName: string;
}

interface StorePreviewSectionProps {
  storeName?: string;
  storeId?: number;
  kakaoStoreId?: number;
  lat: number;
  lng: number;
  searchedPinFromSearchParams?: SearchedPinFromSearchParams;
}

function StorePreviewSection({
  storeName,
  storeId,
  kakaoStoreId,
  lat,
  lng,
  searchedPinFromSearchParams,
}: StorePreviewSectionProps) {
  const searchParams = useSearchParams();
  const { data: storeData } = useGetStore({
    storeId: storeId ?? (Number(searchParams.get('storeId')) || undefined),
  });

  useEffect(() => {
    if (searchParams.get('type') === 'search') return;

    const url = new URL(window.location.origin);
    url.searchParams.set('storeId', String(storeId));
    url.searchParams.set('kakaoStoreId', String(kakaoStoreId));
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lng', String(lng));
    url.searchParams.set(
      'myRevisitedCount',
      String(storeData?.myRevisitedCount ?? 0),
    );
    switchUrl(url);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full h-fit pb-[12px]">
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
        {storeData && storeData.reviewImageUrls.length > 0 && (
          <StoreLogPhotoPreview reviewImageUrls={storeData?.reviewImageUrls} />
        )}
        <div className="flex gap-[8px] p-[16px]">
          <WriteLogButton
            storeName={storeName}
            storeId={storeData?.storeId ?? null}
            myRevisitedCount={storeData?.myRevisitedCount ?? 0}
            searchedPinFromSearchParams={searchedPinFromSearchParams}
          />
          {storeData && (
            <BookmarkButton
              isBookmarked
              //TODO: 서버 인터페이스 변경 예정
              // isBookmarked={storeData.isBookmarked}
              storeId={storeData.storeId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default StorePreviewSection;
