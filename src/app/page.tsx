'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BottomNavigation from '@components/main/BottomNavigation';
import BottomSheet from '@components/main/BottomSheet';
import CurrentLocationMarker from '@components/main/CurrentLocationMarker';
import CustomOverlayPin from '@components/main/CustomOverlayPin';
import FilterTagList from '@components/main/FilterTagList';
import SearchField from '@components/main/SearchField';
import { mapTranslateYAnimationVariants } from '@constants/motions';
import { TAGS } from '@constants/tags';
import useCoordinate from '@hooks/useCoordinate';
import getIsSameId from '@utils/getIsSameId';

const MOCK = [
  { id: '1', lat: 37.498095, lng: 127.02761 },
  { kakaoId: '3', lat: 37.498095, lng: 127.127661 },
  { kakaoId: '65', lat: 37.498095, lng: 127.132761 },
  { kakaoId: '35', lat: 37.478095, lng: 127.152761 },
  { kakaoId: '38', lat: 37.458095, lng: 127.122761 },
  { kakaoId: '39', lat: 37.488095, lng: 127.112761 },
  { kakaoId: '31', lat: 37.443595, lng: 127.1273631 },
  { kakaoId: '3123', lat: 37.598095, lng: 127.123441 },
];

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const { center, setCenter, currentUserCoordinate, throttledCenterChanged } =
    useCoordinate();
  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleCurrentLocationButtonClick = () => {
    setCenter({ ...currentUserCoordinate });
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
        >
          <CurrentLocationMarker
            currentUserCoordinate={currentUserCoordinate}
          />
          {MOCK.map((item, idx) => (
            <CustomOverlayPin
              key={idx}
              isActive={
                isBottomSheetShowing &&
                getIsSameId({
                  centerId: center.id,
                  centerKakaoId: center.kakaoId,
                  pinId: item.id,
                  pinKakaoId: item.kakaoId,
                })
              }
              position={{ lat: item.lat, lng: item.lng }}
              storeName="test"
              isBookmarked={idx === 1}
              totalVisitCount={1}
              onClick={() => {
                //TODO: 클릭시 지도 확대할지 협의 후 결정
                // mapRef.current?.setLevel(3);
                setCenter(item);
                setIsBottomSheetShowing(true);
              }}
            />
          ))}

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
      </div>

      <BottomSheet
        handleCloseBottomSheet={() => {
          setIsBottomSheetShowing(false);
        }}
        isShowing={isBottomSheetShowing}
      >
        <BottomSheet.ShowContent>
          <div className="w-full h-[2500px] bg-primary-50 break-words">
            중간까지 올라온 바텀싯 내용
          </div>
        </BottomSheet.ShowContent>
        <BottomSheet.FullContent>asdfasdfasdfasdfsdf</BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
