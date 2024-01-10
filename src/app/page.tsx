'use client';

import { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap } from 'react-naver-maps';

import BottomSheet from '@components/common/BottomSheet';
import useLocation from '@hooks/useLocation';
import CurrentUserMarker from '@components/common/NaverMap/CurrentUserLocationMarker';

export default function Home() {
  const { center, currentUserCoordinate, getCurrentUserCoordinate } =
    useLocation();
  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);

  useEffect(() => {
    getCurrentUserCoordinate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex h-[100dvh] max-h-[100dvh] flex-col items-center overflow-hidden">
      <MapDiv className="w-full h-full">
        <NaverMap center={center}>
          <CurrentUserMarker currentUserCoordinate={currentUserCoordinate} />
        </NaverMap>
      </MapDiv>

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
