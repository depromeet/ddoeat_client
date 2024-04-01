'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { NewStore, usePostFeed } from '@hooks/api/usePostFeed';
import { useGetPresignedUrl } from '@hooks/api/useGetPresignedUrl';
import ImageUploader from '@components/review/ImageUploader';
import StarRating from '@components/review/StarRating';
import TextArea from '@components/review/TextArea';
import FixedBottomCTAButton from '@components/common/FixedBottomCTAButton';
import VisitDate from '@components/review/VisitDate';
import { useUploadImageToNCloud } from '@hooks/api/useUploadImageToNCloud';
import Header from '@components/common/Header';

export default function Page() {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const storeName = searchParams.get('storeName');
  const myRevisitedCount = searchParams.get('myRevisitedCount') ?? 0;
  const { mutate: postLog } = usePostFeed({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['get-myLog'],
      });
      push(
        `/review/complete?storeName=${storeName}&myRevisitedCount=${
          Number(myRevisitedCount) + 1
        }`,
      );
    },
  });
  const { mutate: uploadImageToNCloud } = useUploadImageToNCloud();
  const [visitedAt, setVisitedAt] = useState(
    new Date().toISOString().substring(0, 10).replaceAll('-', '.'),
  );
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  // NOTE: Presigned URL
  const { data: presignedUrl, refetch } = useGetPresignedUrl(
    imageUrl.split('/')[imageUrl.split('/').length - 1],
  );

  // NOTE: 이미지 로드 시 presigned URL 권한 요청
  useEffect(
    function requestPresignedUrl() {
      if (imageUrl) {
        refetch();
      }
    },
    [imageUrl, refetch],
  );

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitedAt(e.target.value.replaceAll('-', '.'));
  };

  const handleRating = useCallback(
    (index: number) => () => {
      setRating(index + 1);
    },
    [],
  );

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files as FileList)[0]);
    setImageUrl(URL.createObjectURL((e.target.files as FileList)[0]));
  };

  const handleDeleteImage = () => {
    setImageUrl('');
    setFile(null);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClickSubmitButton = () => {
    uploadImageToNCloud({
      presignedUrl: presignedUrl?.presignedUrl as string,
      file,
    });

    const storeId = searchParams.get('storeId') ?? null;
    const newStore = {
      storeName: searchParams.get('storeName'),
      latitude: Number(searchParams.get('latitude')),
      longitude: Number(searchParams.get('longitude')),
      categoryType: searchParams.get('categoryType'),
      kakaoStoreId: Number(searchParams.get('kakaoStoreId')),
      kakaoCategoryName: searchParams.get('kakaoCategoryName'),
      address: searchParams.get('address'),
    } as NewStore;

    // TODO: storeId 유무에 따른 분기 처리
    postLog({
      storeId,
      newStore: storeId ? null : newStore,
      rating,
      visitedAt,
      imageUrl: presignedUrl?.presignedUrl.split('?')[0] as string,
      description,
    });
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <Header className="w-full bg-gray-100 z-header">
        <p className="body-16-bold">맛집 기록 작성</p>
      </Header>
      <div className="h-[100dvh] pt-[56px] pb-[104px] overflow-y-scroll px-[16px]">
        <h1 className="header-22 py-[16px]">
          {storeName}에 <br />
          <strong className="text-primary-500">
            {Number(myRevisitedCount) + 1}번째
          </strong>{' '}
          방문이에요!
        </h1>
        <div className="flex flex-col py-[8px] gap-[16px]">
          <ImageUploader
            onChange={handleChangeImage}
            imageUrl={imageUrl}
            deleteImage={handleDeleteImage}
          />
          <VisitDate onChange={handleChangeDate} />
          <StarRating rating={rating} onClick={handleRating} />
          <TextArea
            value={description}
            onChange={handleChangeDescription}
            placeholder="방문한 맛집에 대한 기록을 남겨주세요. 음식의 맛, 매장의 분위기, 서비스 등 어떤 내용이든 좋아요! (최소 10자)"
          />
        </div>
        <FixedBottomCTAButton
          disabled={
            !rating || !description || description.length < 10 || !imageUrl
          }
          onClick={handleClickSubmitButton}
        >
          작성완료
        </FixedBottomCTAButton>
      </div>
    </div>
  );
}
