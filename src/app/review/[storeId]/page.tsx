'use client';

import { useState, useCallback, ChangeEvent } from 'react';

import ImageUploader from '@components/common/ImageUploader';
import StarRating from '@components/review/StarRating';
import TextArea from '@components/common/TextArea';
import NavigationButton from '@components/terms/NavigationButton';

export default function Page() {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  const handleRating = useCallback(
    (index: number) => () => {
      setRating(index + 1);
    },
    [],
  );

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClickSubmitButton = () => {
    // TODO: 로그 등록 기능 작성
  };

  return (
    <div className="h-[100dvh] pt-[56px] pb-[104px] overflow-y-scroll">
      <h1 className="header-22 py-[16px]">
        가게 이름에 <br />
        <strong className="text-primary-500">NN번째</strong> 방문이에요!
      </h1>
      <div className="flex flex-col py-[8px] gap-[16px]">
        <StarRating rating={rating} onClick={handleRating} />
        <ImageUploader />
        <TextArea value={description} onChange={handleChangeDescription} />
      </div>
      <NavigationButton
        className="bg-transparent fixed bottom-0 left-[50%] -translate-x-[50%]"
        onClick={handleClickSubmitButton}
      >
        작성완료
      </NavigationButton>
    </div>
  );
}
