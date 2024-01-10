'use client';

import { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import BottomSheet from '@components/main/BottomSheet';
import useLocation from '@hooks/useLocation';
import CurrentLocationIcon from 'public/assets/icon24/current_location_24.svg';

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const { center, setCurrentUserLocation } = useLocation();
  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);

  useEffect(() => {
    setCurrentUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex h-[100dvh] max-h-[100dvh] flex-col items-center overflow-hidden">
      <Map
        ref={mapRef}
        center={center}
        className="w-full h-full"
        isPanto={true}
      >
        <CustomOverlayMap position={center}>
          <CurrentLocationIcon />
        </CustomOverlayMap>
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
