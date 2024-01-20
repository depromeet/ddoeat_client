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
  totalVisitCount,
  isActive,
  onClick,
}: CustomOverlayPinProps) {
  return (
    <CustomOverlayMap position={position} zIndex={isActive ? 10 : 0}>
      <Pin
        isActive={isActive}
        storeName={storeName}
        isBookmarked={isBookmarked}
        totalVisitCount={totalVisitCount}
        onClick={onClick}
      />
    </CustomOverlayMap>
  );
}

export default CustomOverlayPin;
