import { useCallback, useEffect, useState } from 'react';

import useThrottle from './useThrottle';
import { ScreenCoordinate } from './api/useGetPinList';

import { Coordinate, CoordinateWithIds } from 'src/types/map';

const GANGNAM_STATION: CoordinateWithIds = {
  storeId: 0,
  kakaoStoreId: 0,
  lat: 37.498095,
  lng: 127.02761,
} as const;

const useCoordinate = ({
  noCurrentLocation = false,
  runInit,
}: {
  noCurrentLocation?: boolean;
  runInit: boolean;
}) => {
  const [center, setCenter] = useState<CoordinateWithIds>(GANGNAM_STATION);
  const [screenCoordinate, setScreenCoordinate] =
    useState<ScreenCoordinate | null>(null);
  const [showLoadPinListButton, setShowLoadPinListButton] = useState(false);
  const [currentUserCoordinate, setCurrentUserCoordinate] =
    useState<Coordinate | null>(null);

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
    ({ ms, runInit }: { ms: number; runInit: boolean }) => {
      getCurrentUserCoordinate(
        onSuccess(runInit ? onSuccessInit : undefined),
        onError,
      );
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

    setShowLoadPinListButton(true);
    setCenter((prev) => ({ ...prev, ...newCenter }));
  };

  const handleBoundChanged = (map?: kakao.maps.Map) => {
    if (!map) return;

    const newScreenCoordinate = {
      leftTopLatitude: map.getBounds().getNorthEast().getLat(),
      leftTopLongitude: map.getBounds().getNorthEast().getLng(),
      rightBottomLatitude: map.getBounds().getSouthWest().getLat(),
      rightBottomLongitude: map.getBounds().getSouthWest().getLat(),
    };

    setShowLoadPinListButton(true);
    setScreenCoordinate(newScreenCoordinate);
  };

  const throttledCenterChanged = useThrottle(handleCenterChanged, 1000);
  const throttledBoundChanged = useThrottle(handleBoundChanged, 1000);

  useEffect(() => {
    !noCurrentLocation &&
      getCurrentUserCoordinateInterval({ ms: 5000, runInit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    center,
    setCenter,
    currentUserCoordinate,
    throttledCenterChanged,
    throttledBoundChanged,
    showLoadPinListButton,
    setShowLoadPinListButton,
    screenCoordinate,
    setScreenCoordinate,
  };
};

export default useCoordinate;
