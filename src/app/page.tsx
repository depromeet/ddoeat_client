'use client';

import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BottomSheet from '@components/main/BottomSheet';
import CurrentLocationMarker from '@components/main/CurrentLocationMarker';
import useCoordinate from '@hooks/useCoordinate';
import SearchField from '@components/main/SearchField';

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const { center, currentUserCoordinate, getCurrentUserCoordinate } =
    useCoordinate();
  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);

  useEffect(() => {
    getCurrentUserCoordinate();
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
        <CurrentLocationMarker currentUserCoordinate={currentUserCoordinate} />
        <div className="absolute top-[54px] z-10 w-full px-[16px]">
          <SearchField />
        </div>
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
