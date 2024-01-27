'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BottomNavigation from '@components/main/BottomNavigation';
import BottomSheet from '@components/main/BottomSheet';
import CurrentLocationMarker from '@components/main/CurrentLocationMarker';
import FilterTagList from '@components/main/FilterTagList';
import SearchField from '@components/main/SearchField';
import { TAGS } from '@constants/tags';
import useCoordinate from '@hooks/useCoordinate';
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

  const throttledCenterChanged = useThrottle(handleCenterChanged, 1000);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

        <BottomNavigation
          onCurrentLocationButtonClick={onCurrentLocationButtonClick}
          className="absolute bottom-[56px] z-above"
        />
      </Map>
      <div className="absolute top-[54px] z-above w-full px-[16px]">
        <SearchField />
        <FilterTagList
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          className="absolute left-0 px-[16px] top-[calc(100%+12px)]"
        >
          {TAGS.map(({ value, text, defaultIcon, selectedIcon }) => {
            return (
              <FilterTagList.Item value={value} key={value}>
                {defaultIcon && selectedIcon && (
                  <Image
                    width={20}
                    height={20}
                    alt={value}
                    src={selectedTag === value ? selectedIcon : defaultIcon}
                  />
                )}
                {text}
              </FilterTagList.Item>
            );
          })}
        </FilterTagList>
      </div>

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
