'use client';

import Image from 'next/image';

interface StoreDetailLogProps {
  date: string;
  restaurantImgUrl?: string;
  restaurantName: string;
  log: string;
}

export default function StoreDetailLog({
  date,
  log,
  restaurantImgUrl,
  restaurantName,
}: StoreDetailLogProps) {
  return (
    <div className="flex flex-col">
      <p className="px-[16px] py-[10px] text-gray-700 body-14-bold">{date}</p>
      {/* TODO: 준상님 restaurant 컴포넌트 삽입 예정*/}
      <div className="flex flex-col justify-center">
        <div className="px-[16px] py-[8px]">
          {restaurantImgUrl && (
            <Image
              src={restaurantImgUrl}
              alt={restaurantName}
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
