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
  totalRevisitedCount,
  isActive,
  onClick,
}: CustomOverlayPinProps) {
  return (
    <CustomOverlayMap
      position={position}
      zIndex={isActive ? 10 : 0}
      key={String(position.storeId) + String(position.kakaoStoreId) + isActive}
    >
      <Pin
        isActive={isActive}
        storeName={storeName}
        isBookmarked={isBookmarked}
        totalRevisitedCount={totalRevisitedCount}
        onClick={onClick}
      />
    </CustomOverlayMap>
  );
}

export default CustomOverlayPin;
