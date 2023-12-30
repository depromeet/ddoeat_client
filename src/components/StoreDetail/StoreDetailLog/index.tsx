'use client';

import Image from 'next/image';

interface StoreDetailLogProps {
  date: string;
  storeImgUrl?: string;
  storeName: string;
  log: string;
}

export default function StoreDetailLog({
  date,
  log,
  storeImgUrl,
  storeName,
}: StoreDetailLogProps) {
  return (
    <div className="flex flex-col">
      <p className="px-[16px] py-[10px] text-gray-700 body-14-bold">{date}</p>
      {/* TODO: 준상님 store 컴포넌트 삽입 예정*/}
      <div className="flex flex-col justify-center">
        <div className="px-[16px] py-[8px]">
          {storeImgUrl && (
            <Image
              src={storeImgUrl}
              alt={storeName}
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
