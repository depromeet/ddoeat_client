import StarScore from '@components/common/StarScore';
import Tag from '@components/common/Tag';
import switchUrl from '@utils/switchUrl';

interface StoreInformationProps {
  categoryName: string;
  storeName: string;
  address: string;
  totalRating: number;
  totalReviewCount: number;
  myRevisitedCount: number;
}

function StoreInformation({
  categoryName,
  storeName,
  address,
  totalRating,
  totalReviewCount,
  myRevisitedCount,
}: StoreInformationProps) {
  const handleStoreNameClick = () => {
    const url = new URL(window.location.href);

    if (url.searchParams.get('bottomSheetStatus') === 'full') return;

    url.searchParams.set('bottomSheetStatus', 'full');
    switchUrl(url);
  };

  return (
    <div className="flex flex-col p-[16px] gap-[8px]">
      <div className="flex flex-col gap-[4px] items-center">
        <button onClick={handleStoreNameClick}>
          <span className="header-20 text-gray-900">{storeName}</span>
        </button>
        <div className="flex gap-[4px]">
          <Tag size="small" className="bg-primary-100 text-primary-500">
            내방문 {myRevisitedCount}번
          </Tag>
          <Tag size="small" className=" bg-gray-50 text-gray-500">
            {categoryName}
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-[4px] items-center">
        <span className="caption-12-bold text-gray-900">{address}</span>
        <div className="flex gap-[8px] items-center">
          <StarScore rating={totalRating} />
          <hr className="w-[1px] h-[10px] bg-gray-300" />
          <span className="body-14-bold text-gray-900">
            방문기록 {totalReviewCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StoreInformation;
