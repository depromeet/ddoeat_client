import CustomOverlayPin from '../CustomOverlayPin';

import { Pin } from '@hooks/api/useGetPinList';
import getIsSameId from '@utils/getIsSameId';
import { CoordinateWithIds } from 'src/types/map';

interface LocationStorePinListProps {
  locationStoreList: Pin[];
  isBottomSheetShowing: boolean;
  selectedPin: CoordinateWithIds | null;
  onPinClick: (props: CoordinateWithIds) => void;
  mapLevel: number;
}

function LocationStorePinList({
  locationStoreList,
  isBottomSheetShowing,
  selectedPin,
  onPinClick,
  mapLevel,
}: LocationStorePinListProps) {
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
          isBookmarked={store.isBookmarked}
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

export default LocationStorePinList;
