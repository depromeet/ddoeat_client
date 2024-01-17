'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';

import { usePostLog } from '@hooks/api/usePostLog';
import { useGetPresignedUrl } from '@hooks/api/useGetPresignedUrl';
import ImageUploader from '@components/review/ImageUploader';
import StarRating from '@components/review/StarRating';
import TextArea from '@components/review/TextArea';
import NavigationButton from '@components/terms/NavigationButton';
import VisitDate from '@components/review/VisitDate';

export default function Page({ params }: { params: { storeId: string[] } }) {
  const { mutate: postLog } = usePostLog();
  const [visitedAt, setVisitedAt] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Presigned URL
  const { data: presignedUrl, refetch } = useGetPresignedUrl('screenShot');

  // 주소 변경 시 presigned url 주소 요청
  useEffect(
    function requestPresignedUrl() {
      if (imageUrl) {
        refetch();
      }
    },
    [imageUrl, refetch],
  );

  const storeId = params?.storeId ? params.storeId[0] : null;

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitedAt(e.target.value);
  };

  const handleRating = useCallback(
    (index: number) => () => {
      setRating(index + 1);
    },
    [],
  );

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(URL.createObjectURL((e.target.files as FileList)[0]));
  };

  const handleDeleteImage = () => {
    setImageUrl('');
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClickSubmitButton = () => {
    // TODO: 이미지 기능 구현
    postLog({
      storeId,
      newStore: null,
      rating,
      visitedAt,
      imageUrl,
      description,
    });
  };

  return (
    <div className="h-[100dvh] pt-[56px] pb-[104px] overflow-y-scroll">
      <h1 className="header-22 py-[16px]">
        가게 이름에 <br />
        <strong className="text-primary-500">NN번째</strong> 방문이에요!
      </h1>
      <div className="flex flex-col py-[8px] gap-[16px]">
        <VisitDate onChange={handleChangeDate} />
        <StarRating rating={rating} onClick={handleRating} />
        <ImageUploader
          onChange={handleChangeImage}
          imageUrl={imageUrl}
          deleteImage={handleDeleteImage}
        />
        <TextArea value={description} onChange={handleChangeDescription} />
      </div>
      <NavigationButton
        className="bg-transparent fixed bottom-0 left-[50%] -translate-x-[50%]"
        disabled={!rating || !description || !imageUrl}
        onClick={handleClickSubmitButton}
      >
        작성완료
      </NavigationButton>
    </div>
  );
}
