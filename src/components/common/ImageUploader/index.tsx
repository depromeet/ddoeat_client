'use client';

import { useRef } from 'react';

import PlusIcon from 'public/assets/icon40/plus_40.svg';

export default function ImageUploader() {
  const imageUploadButtonRef = useRef<HTMLInputElement>(null);

  const handleClickUploadButton = () => {
    imageUploadButtonRef.current?.click();
  };

  return (
    <div
      className="bg-white rounded-[24px] text-center w-full h-[160px] flex flex-col justify-center items-center gap-[8px]"
      onClick={handleClickUploadButton}
    >
      <p className="body-16-bold">사진을 추가해주세요.</p>
      <p className="body-14-regular">*기록당 최대 1개 업로드가 가능해요.</p>
      <PlusIcon />
      <input className="hidden" type="file" ref={imageUploadButtonRef} />
    </div>
  );
}
