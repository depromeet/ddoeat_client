import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import Pin, { PinProps } from '@components/common/Pin';
import { CoordinateWithIds } from 'src/types/map';

interface CustomOverlayPinProps extends PinProps {
  position: CoordinateWithIds;
}

function CustomOverlayPin({
  storeName,
  position,
  isBookmarked,
  totalRevisitedCnt,
  isActive,
  onClick,
  mapLevel,
}: CustomOverlayPinProps) {
  return (
    <CustomOverlayMap
      position={position}
      zIndex={isActive ? 10 : 0}
      key={String(position.storeId) + String(position.kakaoStoreId) + isActive}
    >
      <Pin
        mapLevel={mapLevel}
        isActive={isActive}
        storeName={storeName}
        isBookmarked={isBookmarked}
        totalRevisitedCnt={totalRevisitedCnt}
        onClick={onClick}
      />
    </CustomOverlayMap>
  );
}

export default CustomOverlayPin;
