import { useCallback, useEffect, useState } from 'react';

import useThrottle from './useThrottle';

import { Coordinate, CoordinateWithIds } from 'src/types/map';

const GANGNAM_STATION: CoordinateWithIds = {
  id: '1',
  kakaoId: '1',
  lat: 37.498095,
  lng: 127.02761,
} as const;

const useCoordinate = () => {
  const [center, setCenter] = useState<CoordinateWithIds>(GANGNAM_STATION);
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

  const handleCenterChanged = (map?: kakao.maps.Map) => {
    if (!map) return;

    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };

    setCenter((prev) => ({ ...prev, ...newCenter }));
  };

  const throttledCenterChanged = useThrottle(handleCenterChanged, 1000);

  useEffect(() => {
    getCurrentUserCoordinateInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    center,
    setCenter,
    currentUserCoordinate,
    getCurrentUserCoordinate: (
      addtionalCallback: (pos: GeolocationPosition) => void,
    ) => getCurrentUserCoordinate(onSuccess(addtionalCallback), onError),
    getCurrentUserCoordinateInterval,
    throttledCenterChanged,
  };
};

export default useCoordinate;
