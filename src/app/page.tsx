'use client';

import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BottomSheet from '@components/main/BottomSheet';
import CurrentLocationMarker from '@components/main/CurrentLocationMarker';
import useCoordinate from '@hooks/useCoordinate';
import SearchField from '@components/main/SearchField';
import BottomNavigation from '@components/main/BottomNavigation';
import useThrottle from '@hooks/useThrottle';

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const {
    center,
    setCenter,
    currentUserCoordinate,
    getCurrentUserCoordinateInterval,
  } = useCoordinate();
  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);

  useEffect(() => {
    getCurrentUserCoordinateInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCurrentLocationButtonClick = () => {
    setCenter({ ...currentUserCoordinate });
  };

  const handleCenterChanged = (map?: kakao.maps.Map) => {
    if (!map) return;

    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };

    setCenter(newCenter);
  };

  const throttledCenterChanged = useThrottle(handleCenterChanged, 10000);

  return (
    <main className="flex h-[100dvh] max-h-[100dvh] flex-col items-center overflow-hidden">
      <Map
        ref={mapRef}
        center={center}
        className="w-full h-full"
        isPanto={true}
        onCenterChanged={throttledCenterChanged}
      >
        <CurrentLocationMarker currentUserCoordinate={currentUserCoordinate} />
        <div className="absolute top-[54px] z-above w-full px-[16px]">
          <SearchField />
        </div>
        <BottomNavigation
          onCurrentLocationButtonClick={onCurrentLocationButtonClick}
          className="absolute bottom-[56px] z-above"
        />
      </Map>

      <BottomSheet
        handleCloseBottomSheet={() => {
          setIsBottomSheetShowing(false);
        }}
        isShowing={isBottomSheetShowing}
      >
        <BottomSheet.ShowContent>
          <div className="w-full h-[3000px] bg-primary-50 break-words">
            중간까지 올라온 바텀싯 내용
          </div>
        </BottomSheet.ShowContent>
        <BottomSheet.FullContent></BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
