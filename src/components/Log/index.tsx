'use client';

import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

import MenuTypeFlag from '@components/common/MenuTypeFlag';
import VisitNumFlag from '@components/common/VisitNumFlag';
import StarRating from '@components/common/StarRating';

interface MyLogProps extends HTMLAttributes<HTMLLIElement> {
  date: string;
  restaurantImgUrl: string;
  restaurantName: string;
  visitNum: number;
  menuType: string;
  rating: number;
  log: string;
}

export default function MyLog({
  date,
  restaurantImgUrl,
  restaurantName,
  visitNum,
  menuType,
  rating,
  log,
}: MyLogProps) {
  return (
    <li className="flex flex-col w-full h-[243px] bg-white p-[16px] gap-y-[8px]">
      <div className="flex flex-row w-full h-[20px] gap-x-[8px]">
        <div className="w-[16px] h-[16px]"></div>
        <p className="text-gray-700 body-14-bold">{date}</p>
      </div>
      <div className="flex flex-row items-center w-full h-[183px] gap-x-[8px]">
        <svg className="w-[16px] h-full stroke-primary-300">
          <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="1" />
        </svg>
        <div className="flex flex-col w-full h-full gap-y-[8px]">
          <div className="flex flex-row justify-between items-center w-full h-[126px] px-[16px] py-[12px] gap-x-[8px] rounded-[24px] bg-gray-50 border border-gray-100">
            <div className="flex flex-col">
              <span className="mb-[8px] body-16-bold text-gray-900">
                {restaurantName}
              </span>
              <div className="flex flex-row items-center mb-[4px] gap-x-[4px]">
                <VisitNumFlag visitNum={visitNum} />
                <MenuTypeFlag menuType={menuType} />
              </div>
              <div className="flex flex-row items-center gap-x-[4px]">
                <span className="body-16-bold text-primary-500">{rating}</span>
                <StarRating rating={rating} />
              </div>
            </div>
            <Image
              src={restaurantImgUrl}
              alt={restaurantName}
              width={100}
              height={100}
            />
          </div>
          <span className="caption-12-regular text-gray-700">{log}</span>
        </div>
      </div>
    </li>
  );
}
