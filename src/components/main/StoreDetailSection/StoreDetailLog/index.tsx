'use client';

import Image from 'next/image';

import LogItem from '@components/main/LogItem';

interface StoreDetailLogProps {
  date: string;
  score: number;
  storeImgUrl?: string;
  name: string;
  visitNum: number;
  log: string;
  hasDeleteOption: boolean;
  isLast: boolean;
}

export default function StoreDetailLog({
  date,
  score,
  log,
  storeImgUrl,
  name,
  visitNum,
  hasDeleteOption,
  isLast,
}: StoreDetailLogProps) {
  return (
    <div className="flex flex-col">
      <p className="px-[16px] py-[10px] text-gray-700 body-14-bold">{date}</p>
      <LogItem
        userName={name}
        visitNum={visitNum}
        score={score}
        isLast={isLast}
        hasDeleteOption={hasDeleteOption}
        date={date}
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
