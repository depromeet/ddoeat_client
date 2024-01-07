'use client';

import { useState, useCallback } from 'react';

import ImageUploader from '@components/common/ImageUploader';
import StarRating from '@components/review/StarRating';
import TextArea from '@components/common/TextArea';
import NavigationButton from '@components/terms/NavigationButton';

export default function Page() {
  const [rating, setRating] = useState(0);

  const handleRating = useCallback(
    (index: number) => () => {
      setRating(index + 1);
    },
    [],
  );

  const handleClickSubmitButton = () => {};

  return (
    <div className="relative min-h-[100dvh]">
      <h1 className="header-22 py-[16px]">
        가게 이름에 <br />
        <strong className="text-primary-500">NN번째</strong> 방문이에요!
      </h1>
      <div className="flex flex-col py-[8px] gap-[16px]">
        <StarRating rating={rating} onClick={handleRating} />
        <ImageUploader />
        <TextArea />
      </div>
      <NavigationButton
        className="bg-transparent absolute bottom-0 left-0"
        onClick={handleClickSubmitButton}
      >
        작성완료
      </NavigationButton>
    </div>
  );
}
