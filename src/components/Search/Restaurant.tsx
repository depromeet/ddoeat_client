import { HTMLAttributes } from 'react';
import Image from 'next/image';

import VisitNumberFlag from '@components/common/VisitNumberFlag';
import More from 'public/assets/icon/More.svg';
import restaurantImg from 'public/assets/img/search/restaurant.png';
import cn from '@utils/cn';

interface RestaurantProps extends HTMLAttributes<HTMLLIElement> {
  restaurantImgUrl?: string;
  restaurantName: string;
  menuType: string;
  location: string;
  visitNum: number;
  hasMoreOption: boolean;
  isLast: boolean;
}

export default function Restaurant({
  restaurantImgUrl,
  restaurantName,
  menuType,
  location,
  visitNum,
  hasMoreOption,
  isLast,
}: RestaurantProps) {
  return (
    <li className="w-full px-4 pt-2 flex justify-between items-center">
      <div
        className={`${cn('flex justify-between items-center pt-2 pb-4 w-full', {
          'border-b-gray-100 border-b-[1px]': isLast,
        })}`}
      >
        <div className="flex gap-2">
          <Image
            src={restaurantImgUrl ?? restaurantImg}
            alt={restaurantName}
            width={60}
            height={60}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <p className="body-16-bold">{restaurantName}</p>
              {visitNum && <VisitNumberFlag visitNum={visitNum} />}
            </div>
            <div className="flex caption-12-bold">
              <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
                {menuType}
              </p>
              <p>{location}</p>
            </div>
          </div>
        </div>
        {hasMoreOption && (
          <button>
            <More />
          </button>
        )}
      </div>
    </li>
  );
}
