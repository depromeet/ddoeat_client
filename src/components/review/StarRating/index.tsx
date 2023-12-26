'use client';

import { useContext } from 'react';

import { ReviewContext } from '..';

import DefaultStar from 'public/assets/icon/default_star_40.svg';
import FilledStar from 'public/assets/icon/filled_star_40.svg';

const starNum = 5;

export default function StarRating() {
  const { rating, setRating } = useContext(ReviewContext);

  const handleClickStar = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="rounded-[24px] w-full h-[118px] flex flex-col justify-center items-center">
      <div>
        <p className="body-16-bold text-center">만족도를 평가해주세요.</p>
        <div className="flex pt-[8px]">
          {Array.from({ length: starNum }).map((_, index) =>
            index < rating ? (
              <FilledStar key={index} onClick={() => handleClickStar(index)} />
            ) : (
              <DefaultStar key={index} onClick={() => handleClickStar(index)} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
