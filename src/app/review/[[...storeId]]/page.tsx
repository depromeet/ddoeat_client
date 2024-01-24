'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';

import { usePostLog } from '@hooks/api/usePostLog';
import { useGetPresignedUrl } from '@hooks/api/useGetPresignedUrl';
import ImageUploader from '@components/review/ImageUploader';
import StarRating from '@components/review/StarRating';
import TextArea from '@components/review/TextArea';
import FixedBottomCTAButton from '@components/common/FixedBottomCTAButton';
import VisitDate from '@components/review/VisitDate';
import { useUploadImageToNCloud } from '@hooks/api/useUploadImageToNCloud';

export default function Page({ params }: { params: { storeId: string[] } }) {
  const { mutate: postLog } = usePostLog();
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
    imageUrl.slice(27),
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

  // NOTE: 첫 방문 가게면 null
  const storeId = params?.storeId ? params.storeId[0] : null;

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
    // NOTE:
    uploadImageToNCloud({
      presignedUrl: presignedUrl?.presignedUrl as string,
      file,
    });
    // TODO: storeId 유무에 따른 분기 처리
    postLog({
      storeId,
      newStore: null,
      rating,
      visitedAt,
      imageUrl: presignedUrl?.presignedUrl as string,
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
      <FixedBottomCTAButton
        disabled={!rating || !description || !imageUrl}
        onClick={handleClickSubmitButton}
      >
        작성완료
      </FixedBottomCTAButton>
    </div>
  );
}
