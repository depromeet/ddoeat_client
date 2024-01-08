import { useState } from 'react';

export interface Location {
  lat: number;
  lng: number;
}

const GANGNAM_STATION: Location = {
  lat: 37.498095,
  lng: 127.02761,
};

const useLocation = () => {
  const [center, setCenter] = useState<Location>(GANGNAM_STATION);

  const setCurrentUserLocation = () => {
    const onSuccess = (pos: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      setCenter({ lat, lng });
    };

    const onError = () => {
      throw new Error('현재 위치를 가져올 수 없습니다.');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { center, setCurrentUserLocation };
};

export default useLocation;
