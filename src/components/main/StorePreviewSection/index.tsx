import StoreInformation from '../StoreInformation';
import WriteLogButton from '../WriteLogButton';
import StoreLogPhotoPreview from './StoreLogPhotoPreview';

import BookmarkButton from '@components/common/BookmarkButton';

function StorePreviewSection() {
  return (
    <div className="w-full h-fit pb-[12px]">
      <StoreInformation />
      <StoreLogPhotoPreview />
      <div className="flex gap-[8px] p-[16px]">
        <WriteLogButton storeId="asdf" />
        <BookmarkButton isBookmarked storeId="asdf" />
      </div>
    </div>
  );
}

export default StorePreviewSection;
