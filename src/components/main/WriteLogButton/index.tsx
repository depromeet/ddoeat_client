'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { SearchedPinFromSearchParams } from '../StorePreviewSection';

import PenIcon from 'public/assets/icon20/pen_20.svg';
import cn from '@utils/cn';
import Button from '@components/common/Button';
import useGetReviewAvailable from '@hooks/api/useGetReviewAvailable';

interface WriteLogButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  storeName?: string;
  storeId: number | null;
  myRevisitedCount: number;
  searchedPinFromSearchParams?: SearchedPinFromSearchParams;
}

export default function WriteLogButton({
  storeName,
  storeId,
  className,
  myRevisitedCount,
  searchedPinFromSearchParams,
  ...restProps
}: WriteLogButtonProps) {
  const router = useRouter();
  const [isFetched, setIsFetched] = useState(false);
  const { refetch: getReviewAvailable, data } = useGetReviewAvailable({
    storeId: storeId ?? undefined,
  });

  const goToReview = () => {
    const url = new URL(`${window.location.origin}/feed/regist`);

    if (!storeId && searchedPinFromSearchParams) {
      url.searchParams.set(
        'kakaoStoreId',
        String(searchedPinFromSearchParams.position.kakaoStoreId),
      );
      url.searchParams.set(
        'latitude',
        String(searchedPinFromSearchParams.position.lat),
      );
      url.searchParams.set(
        'longitude',
        String(searchedPinFromSearchParams.position.lng),
      );
      url.searchParams.set(
        'storeName',
        String(searchedPinFromSearchParams.storeName),
      );
      url.searchParams.set(
        'categoryType',
        String(searchedPinFromSearchParams.categoryType),
      );
      url.searchParams.set(
        'kakaoCategoryName',
        String(searchedPinFromSearchParams.kakaoCategoryName),
      );
      url.searchParams.set(
        'address',
        String(searchedPinFromSearchParams.address),
      );

      router.push(String(url));
      return;
    }

    url.searchParams.set('storeName', String(storeName));
    url.searchParams.set('myRevisitedCount', String(myRevisitedCount));
    url.searchParams.set('storeId', String(storeId));

    router.push(String(url));
  };

  const handleWriteLogButtonClick = async () => {
    if (!storeId) {
      goToReview();
      return;
    }

    try {
      await getReviewAvailable();

      setIsFetched(true);
    } catch (error) {
      toast('에러 발생! 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (!isFetched) return;
    setIsFetched(false);

    if (data?.isAvailable === false) {
      toast('같은 곳은 하루에 3번만 기록 가능해요!');
      return;
    }

    goToReview();
  }, [isFetched]);

  return (
    <Button
      onClick={handleWriteLogButtonClick}
      className={cn(
        'w-full gap-[6px] bg-gray-900 active:bg-gray-700 disabled:bg-gray-100 group',
        className,
      )}
      {...restProps}
    >
      <span className="group-disabled:text-gray-500">맛집 기록 작성</span>
      <PenIcon />
    </Button>
  );
}
