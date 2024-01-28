import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import StoreInformation from '../StoreInformation';
import WriteLogButton from '../WriteLogButton';
import StoreLogPhotoPreview from './StoreLogPhotoPreview';

import BookmarkButton from '@components/common/BookmarkButton';
import useGetStore from '@hooks/api/useGetStore';
import switchUrl from '@utils/switchUrl';

interface StorePreviewSectionProps {
  storeId?: number;
  kakaoStoreId?: number;
  lat: number;
  lng: number;
}

function StorePreviewSection({
  storeId,
  kakaoStoreId,
  lat,
  lng,
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
    switchUrl(url);

    return () => {
      switchUrl('/');
    };
  }, []);

  return (
    <>
      {storeData && (
        <div className="w-full h-fit pb-[12px]">
          <StoreInformation
            categoryName={storeData.categoryName}
            storeName={storeData.storeName}
            address={storeData.address}
            totalRating={storeData.totalRating}
            totalReviewCount={storeData.totalReviewCount}
            myRevisitedCount={storeData.myRevisitedCount}
          />
          {storeData.reviewImageUrls.length > 0 && (
            <StoreLogPhotoPreview reviewImageUrls={storeData.reviewImageUrls} />
          )}
          <div className="flex gap-[8px] p-[16px]">
            <WriteLogButton storeId={storeData.storeId} />
            <BookmarkButton isBookmarked storeId={storeData.storeId} />
          </div>
        </div>
      )}
    </>
  );
}

export default StorePreviewSection;
