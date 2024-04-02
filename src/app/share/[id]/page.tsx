'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import BottomSheet from '@components/main/BottomSheet';
import StoreDetailSection from '@components/main/StoreDetailSection';
import StorePreviewSection from '@components/main/StorePreviewSection';
import SharingSpotPinList from '@components/share/SharingSpotPinList';
import { mapTranslateYAnimationVariants } from '@constants/motions';
import useGetSharingSpot from '@hooks/api/useGetSharingSpot';
import useCoordinate from '@hooks/useCoordinate';
import useDidUpdate from '@hooks/useDidUpdate';
import switchUrl from '@utils/switchUrl';
import { CoordinateWithIds } from 'src/types/map';

export default function Page({ params }: { params: { id: string } }) {
  const mapRef = useRef<kakao.maps.Map>(null);
  const searchParams = useSearchParams();

  const { center, setCenter, currentUserCoordinate, setScreenCoordinate } =
    useCoordinate({
      noCurrentLocation: true,
      runInit: false,
    });
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

  const { data: PinList } = useGetSharingSpot({ userId: params.id });

  const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);

  const [selectedPin, setSelectedPin] = useState<CoordinateWithIds | null>(
    () => {
      return searchParams.get('latitude') && searchParams.get('longitude')
        ? ({
            lat: Number(searchParams.get('latitude')),
            lng: Number(searchParams.get('longitude')),
            storeId: Number(searchParams.get('storeId')) || null,
            kakaoStoreId: Number(searchParams.get('kakaoStoreId')) || null,
          } as CoordinateWithIds)
        : null;
    },
  );

  const [currentLevel, setCurrentLevel] = useState<number>(3);

  useDidUpdate(() => {
    if (selectedPin) {
      setCenter(selectedPin);
      setIsBottomSheetShowing(true);
      return;
    }

    switchUrl(`/share/${params.id}`);
  }, [selectedPin]);

  const onPinClick = async (props: CoordinateWithIds) => {
    await mapRef.current?.setLevel(3);
    setSelectedPin(props);
    setCenter(props);
    setIsBottomSheetShowing(true);
  };

  const onCloseBottomSheet = () => {
    setSelectedPin(null);
    setIsBottomSheetShowing(false);
  };

  const handleZoomChanged = (map: kakao.maps.Map) => {
    setCurrentLevel(map.getLevel());
  };

  useEffect(() => {
    const bounds = () => {
      const bounds = new kakao.maps.LatLngBounds();

      PinList &&
        PinList.locationStoreList.forEach((pin) => {
          bounds.extend(new kakao.maps.LatLng(pin.latitude, pin.longitude));
        });

      return bounds;
    };

    mapRef.current?.setBounds(bounds());
  }, [PinList, mapRef.current]);

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
          level={currentLevel}
          className="w-full h-full"
          isPanto={true}
          onZoomChanged={handleZoomChanged}
        >
          {PinList && (
            <SharingSpotPinList
              mapLevel={currentLevel}
              locationStoreList={PinList.locationStoreList}
              isBottomSheetShowing={isBottomSheetShowing}
              onPinClick={onPinClick}
              selectedPin={selectedPin}
            />
          )}
        </Map>
      </motion.div>

      <BottomSheet
        onCloseBottomSheet={onCloseBottomSheet}
        isShowing={isBottomSheetShowing}
      >
        <BottomSheet.ShowContent
          onCurrentLocationButtonClick={handleCurrentLocationButtonClick}
        >
          {selectedPin && (
            <StorePreviewSection
              lat={selectedPin.lat}
              lng={selectedPin.lng}
              storeId={selectedPin.storeId}
              kakaoStoreId={selectedPin.kakaoStoreId}
            />
          )}
        </BottomSheet.ShowContent>

        <BottomSheet.FullContent>
          <StoreDetailSection storeId={selectedPin?.storeId} />
        </BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
