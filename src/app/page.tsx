'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BookMarkPinList from '@components/main/BookMarkPinList';
import BottomNavigation from '@components/main/BottomNavigation';
import BottomSheet from '@components/main/BottomSheet';
import CurrentLocationMarker from '@components/main/CurrentLocationMarker';
import FilterTagList from '@components/main/FilterTagList';
import LoadPinListButton from '@components/main/LoadPinListButton';
import LocationStorePinList from '@components/main/LocationStorePinList';
import SearchField from '@components/main/SearchField';
import StorePreviewSection from '@components/main/StorePreviewSection';
import { mapTranslateYAnimationVariants } from '@constants/motions';
import { TAGS } from '@constants/tags';
import useGetPinList from '@hooks/api/useGetPinList';
import useCoordinate from '@hooks/useCoordinate';
import { CoordinateWithIds } from 'src/types/map';
import { Categories } from 'src/types/tag';
import useDidUpdate from '@hooks/api/useDidUpdate';

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const {
    center,
    setCenter,
    currentUserCoordinate,
    throttledCenterChanged,
    throttledBoundChanged,
    showLoadPinListButton,
    setShowLoadPinListButton,
    screenCoordinate,
    setScreenCoordinate,
  } = useCoordinate({
    runInit: true,
    onInitSuccess: () => getPinList(),
  });
  //TODO: runinit을 검색에서 넘어오는 경우에만 false로 만들기
  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Categories | null>(null);
  const [selectedPin, setSelectedPin] = useState<CoordinateWithIds | null>(
    null,
  );

  const { refetch: getPinList, data: PinList } = useGetPinList({
    type: selectedTag,
    screenCoordinate,
    level: mapRef.current?.getLevel() ?? 1,
  });

  useDidUpdate(() => {
    if (!currentUserCoordinate || !screenCoordinate) return;
    getPinList();
  }, [selectedTag]);

  useEffect(() => {
    const map = mapRef.current;
    if (currentUserCoordinate && map) {
      console.log('?', {
        leftTopLatitude: map.getBounds().getNorthEast().getLat(),
        leftTopLongitude: map.getBounds().getNorthEast().getLng(),
        rightBottomLatitude: map.getBounds().getSouthWest().getLat(),
        rightBottomLongitude: map.getBounds().getSouthWest().getLat(),
      });
      setScreenCoordinate({
        leftTopLatitude: map.getBounds().getNorthEast().getLat(),
        leftTopLongitude: map.getBounds().getNorthEast().getLng(),
        rightBottomLatitude: map.getBounds().getSouthWest().getLat(),
        rightBottomLongitude: map.getBounds().getSouthWest().getLat(),
      });
    }
  }, [currentUserCoordinate, setScreenCoordinate]);

  const handleCurrentLocationButtonClick = () => {
    currentUserCoordinate && setCenter({ ...currentUserCoordinate });
  };

  const onPinClick = (props: CoordinateWithIds) => {
    //TODO: 클릭시 지도 확대할지 협의 후 결정
    // mapRef.current?.setLevel(3);
    setSelectedPin(props);
    setCenter(props);
    setIsBottomSheetShowing(true);
  };

  return (
    <main className="flex h-[100dvh] flex-col items-center overflow-hidden">
      <motion.div
        variants={mapTranslateYAnimationVariants}
        animate={isBottomSheetShowing ? 'bottomSheetOpen' : 'bottomSheetClosed'}
        className="w-full h-full"
      >
        <Map
          ref={mapRef}
          center={center}
          className="w-full h-full"
          isPanto={true}
          onCenterChanged={throttledCenterChanged}
          onBoundsChanged={throttledBoundChanged}
        >
          <CurrentLocationMarker
            currentUserCoordinate={currentUserCoordinate}
          />
          {PinList && (
            <>
              <LocationStorePinList
                locationStoreList={PinList.locationStoreList}
                isBottomSheetShowing={isBottomSheetShowing}
                onPinClick={onPinClick}
                selectedPin={selectedPin}
              />
              <BookMarkPinList
                BookmarkList={PinList.bookMarkList}
                isBottomSheetShowing={isBottomSheetShowing}
                onPinClick={onPinClick}
                selectedPin={selectedPin}
              />
            </>
          )}
          <BottomNavigation
            onCurrentLocationButtonClick={handleCurrentLocationButtonClick}
            className="absolute bottom-[56px] z-above"
          />
        </Map>
      </motion.div>
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
        <LoadPinListButton
          isShowing={showLoadPinListButton}
          className="absolute top-[calc(100%+60px)] left-[50%] -translate-x-[50%] z-floating"
          onClick={() => {
            getPinList();
            setShowLoadPinListButton(false);
          }}
        />
      </div>

      <BottomSheet
        onCloseBottomSheet={() => {
          setSelectedPin(null);
          setIsBottomSheetShowing(false);
        }}
        isShowing={isBottomSheetShowing}
      >
        <BottomSheet.ShowContent
          onCurrentLocationButtonClick={handleCurrentLocationButtonClick}
        >
          <StorePreviewSection />
        </BottomSheet.ShowContent>
        <BottomSheet.FullContent>asdfasdfasdfasdfsdf</BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
