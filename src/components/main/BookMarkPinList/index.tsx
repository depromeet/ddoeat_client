import CustomOverlayPin from '../CustomOverlayPin';

import { Pin } from '@hooks/api/useGetPinList';
import getIsSameId from '@utils/getIsSameId';
import { CoordinateWithIds } from 'src/types/map';

interface BookMarkPinListProps {
  BookmarkList: Pin[];
  isBottomSheetShowing: boolean;
  selectedPin: CoordinateWithIds | null;
  onPinClick: (props: CoordinateWithIds) => void;
}

function BookMarkPinList({
  BookmarkList,
  isBottomSheetShowing,
  selectedPin,
  onPinClick,
}: BookMarkPinListProps) {
  const handlePinClick = (props: CoordinateWithIds) => () => {
    onPinClick(props);
  };

  return (
    <>
      {BookmarkList.map((store) => (
        <CustomOverlayPin
          key={store.storeId}
          isActive={
            isBottomSheetShowing &&
            getIsSameId({
              centerId: selectedPin?.storeId,
              centerkakaoStoreId: selectedPin?.kakaoStoreId,
              pinId: store.storeId,
              pinkakaoStoreId: store.kakaoStoreId,
            })
          }
          position={{ lat: store.latitude, lng: store.longitude }}
          storeName={store.storeName}
          isBookmarked={true}
          totalRevisitedCount={store.totalRevisitedCount}
          onClick={handlePinClick({
            lat: store.latitude,
            lng: store.longitude,
            storeId: store.storeId,
            kakaoStoreId: store.kakaoStoreId,
          })}
        />
      ))}
    </>
  );
}

export default BookMarkPinList;
