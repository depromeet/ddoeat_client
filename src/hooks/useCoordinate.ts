import { useCallback, useState } from 'react';

import { Coordinate } from 'src/types/map';

const GANGNAM_STATION: Coordinate = {
  lat: 37.498095,
  lng: 127.02761,
} as const;

const useCoordinate = () => {
  const [center, setCenter] = useState<Coordinate>(GANGNAM_STATION);
  const [currentUserCoordinate, setCurrentUserCoordinate] =
    useState<Coordinate>(GANGNAM_STATION);

  const onSuccess = useCallback(
    (addtionalCallback?: (pos: GeolocationPosition) => void) =>
      (pos: GeolocationPosition) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCurrentUserCoordinate({ lat, lng });
        addtionalCallback?.(pos);
      },
    [],
  );

  const onSuccessInit = useCallback((pos: GeolocationPosition) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    setCenter({ lat, lng });
  }, []);

  const onError = () => {
    throw new Error('현재 위치를 가져올 수 없습니다.');
  };

  const getCurrentUserCoordinate = useCallback(
    (onSuccess: PositionCallback, onError: PositionErrorCallback) =>
      navigator.geolocation.getCurrentPosition(onSuccess, onError),
    [],
  );

  const getCurrentUserCoordinateInterval = useCallback(
    (ms = 5000) => {
      getCurrentUserCoordinate(onSuccess(onSuccessInit), onError);
      const intervalId = setInterval(
        () => getCurrentUserCoordinate(onSuccess(), onError),
        ms,
      );

      return () => clearInterval(intervalId);
    },
    [getCurrentUserCoordinate, onSuccess, onSuccessInit],
  );

  return {
    center,
    setCenter,
    currentUserCoordinate,
    getCurrentUserCoordinate: () =>
      getCurrentUserCoordinate(onSuccess(), onError),
    getCurrentUserCoordinateInterval,
  };
};

export default useCoordinate;
