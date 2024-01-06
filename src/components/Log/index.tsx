'use client';

import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

import MenuTypeFlag from '@components/common/MenuTypeFlag';
// import VisitNumFlag from '@components/common/VisitNumFlag';
import StarRating from '@components/common/StarScore';

import LogImage from '/public/assets/image/LogImage.svg';

interface MyLogProps extends HTMLAttributes<HTMLLIElement> {
  date: string;
  storeImgUrl?: string;
  storeName: string;
  visitNum: number;
  menuType: string;
  rating: number;
  log: string;
}

export default function MyLog({
  date,
  storeImgUrl,
  storeName,
  // visitNum,
  menuType,
  rating,
  log,
}: MyLogProps) {
  return (
    <li className="flex flex-col w-full h-full bg-white p-[16px] gap-y-[8px]">
      <div className="flex flex-row w-full h-[20px] gap-x-[8px]">
        <div className="w-[16px] h-[16px]"></div>
        <p className="text-gray-700 body-14-bold">{date}</p>
      </div>
      <div className="flex flex-row items-center w-full h-full gap-x-[8px]">
        <div className="flex flex-col w-full h-full gap-y-[8px] pl-[16px] border-l-[2px] border-primary-300">
          <div className="flex flex-row justify-between items-center w-full h-[126px] px-[16px] py-[12px] gap-x-[8px] rounded-[24px] bg-gray-50 border border-gray-100">
            <div className="flex flex-col">
              <span className="mb-[8px] w-full h-full body-16-bold text-gray-900">
                {storeName}
              </span>
              <div className="flex flex-row items-center mb-[4px] gap-x-[4px]">
                {/* TODO: TAG 컴포넌트 만들어지면 수정하기 */}
                {/* <VisitNumFlag visitNum={visitNum} /> */}
                <MenuTypeFlag menuType={menuType} />
              </div>
              <div className="flex items-center gap-x-[4px]">
                <StarRating rating={rating} />
              </div>
            </div>
            {storeImgUrl ? (
              <Image
                src={storeImgUrl}
                alt={storeName}
                width={100}
                height={100}
              />
            ) : (
              <LogImage />
            )}
          </div>
          <span className="body-14-regular text-gray-700 break-all">{log}</span>
        </div>
      </div>
    </li>
  );
}
