'use client';

import { useRef } from 'react';

import Plus from 'public/assets/icon/plus.svg';

export default function ImageUploader() {
  const imageUploadButtonRef = useRef<HTMLInputElement>(null);

  const handleClickUploadButton = () => {
    imageUploadButtonRef.current?.click();
  };

  return (
    <div
      className="rounded-[24px] text-center w-full h-[160px] flex flex-col justify-center items-center gap-[8px]"
      onClick={handleClickUploadButton}
    >
      <p className="body-16-bold">사진을 추가해주세요.</p>
      <p className="body-14-regular">*기록당 최대 1개 업로드가 가능해요.</p>
      <Plus />
      <input className="hidden" type="file" ref={imageUploadButtonRef} />
    </div>
  );
}
