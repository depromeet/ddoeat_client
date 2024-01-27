import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

import StarRating from '@components/common/StarScore';
import Tag from '@components/common/Tag';

import DotIcon from '/public/assets/icon20/dot_20.svg';

import DeleteTrashButton from '@components/common/DeleteTrashButton';

interface MyLogProps extends HTMLAttributes<HTMLLIElement> {
  visitedAt: string;
  reviewId: number;
  imageUrl?: string;
  storeName: string;
  visitTimes: number;
  categoryName: string;
  rating: number;
  description: string;
  onClick: () => void;
}

export default function MyLog({
  visitedAt,
  imageUrl,
  storeName,
  visitTimes,
  categoryName,
  rating,
  description,
  onClick,
}: MyLogProps) {
  return (
    <>
      <li className="flex flex-col w-full bg-white p-[16px] gap-y-[8px]">
        <div className="flex items-center">
          <div className="flex w-full h-[20px] gap-x-[8px] items-center">
            <DotIcon />
            <p className="text-gray-700 body-14-bold">{visitedAt}</p>
          </div>
          <DeleteTrashButton onClick={onClick} />
        </div>
        <div className="flex items-center w-full h-full gap-x-[8px] justify-end">
          <div className="flex flex-col w-[calc(100%-8px)] h-full gap-y-[8px] pl-[16px] border-l-[1px] border-primary-300">
            <div className="flex justify-between items-center w-full h-[126px] px-[16px] py-[12px] gap-x-[8px] rounded-[24px] bg-gray-50 border border-gray-100">
              <div className="flex flex-col">
                <span className="mb-[8px] w-full h-full body-16-bold text-gray-900">
                  {storeName}
                </span>
                <div className="flex items-center mb-[4px] gap-x-[4px]">
                  <Tag
                    size={'small'}
                    className="text-primary-500 bg-primary-100"
                  >
                    내 방문 {visitTimes}번
                  </Tag>
                  <Tag size={'small'} className="text-gray-500 bg-gray-50">
                    {categoryName}
                  </Tag>
                </div>
                <div className="flex items-center gap-x-[4px]">
                  <StarRating rating={rating} />
                </div>
              </div>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={storeName}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              )}
            </div>
            <span className="body-14-regular text-gray-700 break-all">
              {description}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}
