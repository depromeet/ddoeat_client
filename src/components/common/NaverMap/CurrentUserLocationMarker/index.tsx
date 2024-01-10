import { Marker } from 'react-naver-maps';

import { Coordinate } from 'src/types/map';

interface CurrentUserMarkerProps {
  currentUserCoordinate: Coordinate;
}

export default function CurrentUserMarker({
  currentUserCoordinate,
}: CurrentUserMarkerProps) {
  return (
    <Marker
      position={currentUserCoordinate}
      icon={{ url: '/assets/icon24/current_location_24.svg' }}
    />
  );
}
