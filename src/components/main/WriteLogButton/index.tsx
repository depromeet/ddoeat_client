'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

import { SearchedPinFromSearchParams } from '../StorePreviewSection';

import PenIcon from 'public/assets/icon20/pen_20.svg';
import cn from '@utils/cn';
import Button from '@components/common/Button';

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

  const handleWriteLogButtonClick = () => {
    const url = new URL(`${window.location.origin}/review`);

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

    router.push(String(url));
  };

  return (
    <Button
      onClick={handleWriteLogButtonClick}
      className={cn(
        'w-full gap-[6px] bg-gray-900 active:bg-gray-700 disabled:bg-gray-100 group',
        className,
      )}
      {...restProps}
    >
      <span className="group-disabled:text-gray-500">로그 작성</span>
      <PenIcon />
    </Button>
  );
}
