import CustomOverlayPin from '@components/main/CustomOverlayPin';
import { Pin } from '@hooks/api/useGetPinList';
import getIsSameId from '@utils/getIsSameId';
import { CoordinateWithIds } from 'src/types/map';

interface SharingSpotPinListProps {
  locationStoreList: Omit<Pin, 'isBookmarked'>[];
  isBottomSheetShowing: boolean;
  selectedPin: CoordinateWithIds | null;
  onPinClick: (props: CoordinateWithIds) => void;
  mapLevel: number;
}

function SharingSpotPinList({
  locationStoreList,
  isBottomSheetShowing,
  selectedPin,
  onPinClick,
  mapLevel,
}: SharingSpotPinListProps) {
  const handlePinClick = (props: CoordinateWithIds) => () => {
    onPinClick(props);
  };
  return (
    <>
      {locationStoreList.map((store) => (
        <CustomOverlayPin
          key={store.storeId}
          mapLevel={mapLevel}
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
          isBookmarked={false}
          totalRevisitedCnt={store.totalFeedCnt}
          onClick={handlePinClick({
            storeName: store.storeName,
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

export default SharingSpotPinList;
