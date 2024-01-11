import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import CurrentLocationIcon from 'public/assets/icon24/current_location_24.svg';
import { Coordinate } from 'src/types/map';

interface CurrentLocationMarkerProps {
  currentUserCoordinate: Coordinate;
}

export default function CurrentLocationMarker({
  currentUserCoordinate,
}: CurrentLocationMarkerProps) {
  return (
    <CustomOverlayMap position={currentUserCoordinate}>
      <CurrentLocationIcon />
    </CustomOverlayMap>
  );
}
