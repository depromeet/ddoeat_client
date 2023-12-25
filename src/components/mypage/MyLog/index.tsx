'use client';

import Image from 'next/image';

import React, { HTMLAttributes } from 'react';

import LogImage from '../../../../public/LogImage.svg';

import MenuTypeFlag from '../../common/MenuTypeFlag';
import VisitNumFlag from '../../common/VisitNumFlag';

interface MyLogProps extends HTMLAttributes<HTMLLIElement> {
  date?: string;
  restaurantImgUrl: string;
  restaurantName?: string;
  visitNum?: number;
  menuType?: string;
  rating?: number;
  log?: string;
}

export default function MyLog({
  date = '2023.03.26',
  restaurantImgUrl = '',
  restaurantName = '또잇또잇',
  visitNum = 4,
  menuType = '양식',
  rating = 3.5,
  log = '맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용맛나용',
}: MyLogProps) {
  return (
    //전체 > 위/아래 > 위 : 빈 자리 & 날짜 자리, 아래 : 선 & [작은 모달 + 설명]
    //align items : center?
    <li className="flex flex-col w-full h-[243px] bg-white p-[16px] gap-y-[8px]">
      <div className="flex flex-row w-full h-[20px] gap-x-[8px]">
        <div className="w-[16px] h-[16px]"></div>
        <p className="text-gray-700 body-14-bold">{date}</p>
      </div>
      <div className="flex flex-row items-center w-full h-[183px] gap-x-[8px]">
        <svg className="w-[16px] h-full stroke-primary-300">
          <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="1" />
        </svg>
        <div className="flex flex-col w-full h-full gap-y-[8px] border-gray-100 border-10">
          <div className="flex flex-row justify-between items-center w-full h-[126px] px-[16px] py-[12px] gap-x-[8px] rounded-[24px] bg-gray-50">
            <div className="flex flex-col">
              <span className="mb-[8px] body-16-bold text-gray-900">
                {restaurantName}
              </span>
              <div className="flex flex-row items-center mb-[4px]">
                {/* tag 컴포넌트 만들어서 수정하기 */}
                <VisitNumFlag visitNum={visitNum} />
                <MenuTypeFlag menuType={menuType} />
              </div>
              <div>
                <span className="body-16-bold text-primary-500">{rating}</span>
                {/* 별점 별 채우는 컴포넌트 추가 필요 */}
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

// props로 받아야 될 것
// - 방문 횟수에 따른 별점 채우기
// - 날짜, 상점 이름, 방문 횟수, menu type, 별점, 작성 내용
