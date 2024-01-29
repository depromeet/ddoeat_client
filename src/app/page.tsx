'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BottomNavigation from '@components/main/BottomNavigation';
import BottomSheet from '@components/main/BottomSheet';
import CurrentLocationMarker from '@components/main/CurrentLocationMarker';
import CustomOverlayPin from '@components/main/CustomOverlayPin';
import FilterTagList from '@components/main/FilterTagList';
import LoadPinListButton from '@components/main/LoadPinListButton';
import LocationStorePinList from '@components/main/LocationStorePinList';
import SearchField from '@components/main/SearchField';
import StorePreviewSection from '@components/main/StorePreviewSection';
import { mapTranslateYAnimationVariants } from '@constants/motions';
import { TAGS } from '@constants/tags';
import useGetPinList from '@hooks/api/useGetPinList';
import useCoordinate from '@hooks/useCoordinate';
import useDidUpdate from '@hooks/useDidUpdate';
import switchUrl from '@utils/switchUrl';
import { CoordinateWithIds } from 'src/types/map';
import { Categories } from 'src/types/tag';

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const searchParams = useSearchParams();
  const isSearchType = searchParams.get('type') === 'search';
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
    runInit: !isSearchType,
  });

  const router = useRouter();

  const searchedPinFromSearchParams = isSearchType
    ? {
        position: {
          lat: Number(searchParams.get('latitude')),
          lng: Number(searchParams.get('longitude')),
          storeId: Number(searchParams.get('storeId')) || null,
          kakaoStoreId: Number(searchParams.get('kakaoStoreId')) || null,
        } as CoordinateWithIds,
        storeName: searchParams.get('storeName') || '',
        isBookmarked: Boolean(searchParams.get('isBookmarked')),
        totalRevisitedCount: Number(searchParams.get('totalRevisitedCount')),
        address: searchParams.get('address') || '',
        categoryType: searchParams.get('categoryType') || '',
        distance: Number(searchParams.get('distance')),
        kakaoCategoryName: searchParams.get('kakaoCategoryName') || '',
      }
    : null;

  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Categories | null>(null);

  const [selectedPin, setSelectedPin] = useState<CoordinateWithIds | null>(
    null,
  );

  const [currentLevel, setCurrentLevel] = useState<number | null>(null);

  const { refetch: getPinList, data: PinList } = useGetPinList({
    type: selectedTag,
    screenCoordinate,
    level: currentLevel,
    isSearchType,
  });

  useDidUpdate(() => {
    if (!currentUserCoordinate || !screenCoordinate || !currentLevel) return;
    getPinList();
    setIsBottomSheetShowing(false);
    setSelectedPin(null);
  }, [selectedTag]);

  useDidUpdate(() => {
    if (selectedPin) {
      setCenter(selectedPin);
      setIsBottomSheetShowing(true);
      return;
    }
    if (!selectedPin && !searchedPinFromSearchParams) {
      switchUrl('/');
    }
  }, [selectedPin]);

  useEffect(() => {
    if (searchedPinFromSearchParams) {
      setCenter({
        lat: searchedPinFromSearchParams.position.lat,
        lng: searchedPinFromSearchParams.position.lng,
        storeId: searchedPinFromSearchParams.position.storeId,
        kakaoStoreId: searchedPinFromSearchParams.position.kakaoStoreId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (currentUserCoordinate && map) {
      setScreenCoordinate({
        leftTopLatitude: map.getBounds().getNorthEast().getLat(),
        leftTopLongitude: map.getBounds().getNorthEast().getLng(),
        rightBottomLatitude: map.getBounds().getSouthWest().getLat(),
        rightBottomLongitude: map.getBounds().getSouthWest().getLat(),
      });

      setCurrentLevel(map.getLevel());
    }
  }, [currentUserCoordinate, setScreenCoordinate]);

  const handleCurrentLocationButtonClick = () => {
    currentUserCoordinate && setCenter({ ...currentUserCoordinate });
  };

  const handleSearchFieldClick = () => {
    router.push(`/search?longitude=${center.lng}&latitude=${center.lat}`);
  };

  const onPinClick = (props: CoordinateWithIds) => {
    //TODO: 클릭시 지도 확대할지 협의 후 결정
    // mapRef.current?.setLevel(3);
    setSelectedPin(props);
    setCenter(props);
    setIsBottomSheetShowing(true);
  };

  const handleLoadPinListButtonClick = () => {
    getPinList();
    setShowLoadPinListButton(false);
  };

  const onCloseBottomSheet = () => {
    setSelectedPin(null);
    setIsBottomSheetShowing(false);
    if (isSearchType) {
      switchUrl('/');
    }
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
          {isSearchType && searchedPinFromSearchParams && (
            <CustomOverlayPin isActive {...searchedPinFromSearchParams} />
          )}

          {!isSearchType && PinList && (
            <LocationStorePinList
              locationStoreList={PinList.locationStoreList}
              isBottomSheetShowing={isBottomSheetShowing}
              onPinClick={onPinClick}
              selectedPin={selectedPin}
            />
          )}
          <BottomNavigation
            onCurrentLocationButtonClick={handleCurrentLocationButtonClick}
            className="absolute bottom-[56px] z-above"
          />
        </Map>
      </motion.div>
      <div className="absolute top-[54px] z-above w-full px-[16px]">
        <SearchField onClick={handleSearchFieldClick} />
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
        {!selectedPin && !searchedPinFromSearchParams && (
          <LoadPinListButton
            isShowing={showLoadPinListButton}
            className="absolute top-[calc(100%+60px)] left-[50%] -translate-x-[50%] z-floating"
            onClick={handleLoadPinListButtonClick}
          />
        )}
      </div>

      <BottomSheet
        onCloseBottomSheet={onCloseBottomSheet}
        isShowing={isBottomSheetShowing || Boolean(searchedPinFromSearchParams)}
      >
        <BottomSheet.ShowContent
          onCurrentLocationButtonClick={handleCurrentLocationButtonClick}
        >
          {selectedPin ? (
            <StorePreviewSection
              storeName={selectedPin.storeName}
              lat={selectedPin.lat}
              lng={selectedPin.lng}
              storeId={selectedPin.storeId}
              kakaoStoreId={selectedPin.kakaoStoreId}
            />
          ) : searchedPinFromSearchParams ? (
            <StorePreviewSection
              lat={searchedPinFromSearchParams.position.lat}
              lng={searchedPinFromSearchParams.position.lng}
              storeId={searchedPinFromSearchParams.position.storeId}
              kakaoStoreId={searchedPinFromSearchParams.position.kakaoStoreId}
              searchedPinFromSearchParams={searchedPinFromSearchParams}
            />
          ) : null}
        </BottomSheet.ShowContent>

        <BottomSheet.FullContent>asdfasdfasdfasdfsdf</BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
