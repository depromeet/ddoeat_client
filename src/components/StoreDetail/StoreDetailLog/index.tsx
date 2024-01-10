'use client';

import Image from 'next/image';

import Store from '@components/search/store';

interface StoreDetailLogProps {
  storeId: string;
  date: string;
  storeImgUrl?: string;
  name: string;
  menuType: string;
  visitNum: number;
  log: string;
  hasDeleteOption: boolean;
  isLast: boolean;
}

export default function StoreDetailLog({
  storeId,
  date,
  log,
  storeImgUrl,
  name,
  menuType,
  visitNum,
  hasDeleteOption,
  isLast,
}: StoreDetailLogProps) {
  return (
    <div className="flex flex-col">
      <p className="px-[16px] py-[10px] text-gray-700 body-14-bold">{date}</p>
      <Store
        storeId={storeId}
        name={name}
        menuType={menuType}
        revisitNum={visitNum}
        hasDeleteOption={hasDeleteOption}
        isLast={isLast}
        listType="storeDetail"
      />
      <div className="flex flex-col justify-center">
        <div className="px-[16px] py-[8px]">
          {storeImgUrl && (
            <Image
              src={storeImgUrl}
              alt={name}
              width={343}
              height={150}
              layout="responsive"
              objectFit="cover"
            />
          )}
        </div>
        <span className="px-[16px] py-[8px] break-all body-14-regular text-gray-700">
          {log}
        </span>
      </div>
    </div>
  );
}
