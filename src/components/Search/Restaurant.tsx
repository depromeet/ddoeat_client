'use client';

import React, { HTMLAttributes } from 'react';
import Image from 'next/image';

import VisitNumberFlag from '@components/common/VisitNumberFlag';
import restaurant from 'public/assets/img/search/restaurant.png';

interface RestaurantProps extends HTMLAttributes<HTMLLIElement> {
  restaurantImgUrl: string;
  restaurantName: string;
  menuType: string;
  location: string;
  visitNum: number;
}

export default function Restaurant({
  restaurantImgUrl,
  restaurantName,
  menuType,
  location,
  visitNum,
}: RestaurantProps) {
  return (
    <li className="w-full px-4 pt-2">
      <div className="flex gap-3 pt-2 pb-4 border-b-gray-100 border-b-[1px]">
        <Image
          src={restaurantImgUrl ?? restaurant}
          alt="식당 이미지"
          width={60}
          height={60}
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <p className="body-16-bold leading-[22px]">
              {restaurantName ?? 'Value'}
            </p>
            <VisitNumberFlag visitNum={visitNum} />
          </div>
          <div className="flex caption-12-bold leading-[17px]">
            <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
              {menuType ?? 'Menu Type'}
            </p>
            <p>{location ?? 'Location'}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
