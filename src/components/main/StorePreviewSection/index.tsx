import StoreInformation from '../StoreInformation';
import WriteLogButton from '../WriteLogButton';
import StoreLogPhotoPreview from './StoreLogPhotoPreview';

import useGetStore from '@hooks/api/useGetStore';
import BookmarkButton from '@components/common/BookmarkButton';

interface StorePreviewSectionProps {
  storeId?: number;
}

function StorePreviewSection({ storeId }: StorePreviewSectionProps) {
  const { data: storeData } = useGetStore({ storeId });

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
