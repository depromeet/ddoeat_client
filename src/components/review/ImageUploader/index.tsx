import { ChangeEvent, useRef } from 'react';
import Image from 'next/image';

import PlusIcon from 'public/assets/icon40/plus_40.svg';
import CloseIcon from 'public/assets/icon24/close_solid_24.svg';

interface ImageUploaderProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteImage: () => void;
  imageUrl: string;
}

export default function ImageUploader({
  onChange,
  deleteImage,
  imageUrl,
}: ImageUploaderProps) {
  const imageUploadButtonRef = useRef<HTMLInputElement>(null);

  const handleClickUploadButton = () => {
    imageUploadButtonRef.current?.click();
  };

  return (
    <div
      className="relative bg-white rounded-[24px] text-center w-full h-[160px] flex flex-col justify-center items-center gap-[8px] overflow-hidden"
      onClick={handleClickUploadButton}
    >
      {imageUrl ? (
        <div>
          <Image
            className="object-cover"
            src={imageUrl}
            alt="리뷰 업로드 사진"
            fill
          />
          <button
            onClick={deleteImage}
            className="absolute top-[8px] right-[8px]"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <>
          <p className="body-16-bold">사진을 추가해주세요.</p>
          <p className="body-14-regular">*기록당 최대 1개 업로드가 가능해요.</p>
          <PlusIcon />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={imageUploadButtonRef}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
}
