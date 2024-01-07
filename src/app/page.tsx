'use client';

import { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import BottomSheet from '@components/common/BottomSheet';
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
        <BottomSheet.FullContent>
          <div className="w-full h-[2000px] bg-primary-300 break-words">
            풀페이지 바텀싯 내용
          </div>
        </BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
