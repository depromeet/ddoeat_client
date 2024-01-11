import { useState } from 'react';

import { Coordinate } from 'src/types/map';

const GANGNAM_STATION: Coordinate = {
  lat: 37.498095,
  lng: 127.02761,
};

const useCoordinate = () => {
  const [center, setCenter] = useState<Coordinate>(GANGNAM_STATION);
  const [currentUserCoordinate, setCurrentUserCoordinate] =
    useState<Coordinate>(GANGNAM_STATION);

  const getCurrentUserCoordinate = () => {
    const onSuccess = (pos: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      setCenter({ lat, lng });
      setCurrentUserCoordinate({ lat, lng });
    };

    const onError = () => {
      throw new Error('현재 위치를 가져올 수 없습니다.');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { center, currentUserCoordinate, getCurrentUserCoordinate };
};

export default useCoordinate;
