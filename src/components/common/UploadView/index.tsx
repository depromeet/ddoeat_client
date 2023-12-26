'use client';

import { useRef } from 'react';

import Plus from 'public/assets/icon/plus.svg';

export default function UploadView() {
  const imageUploadButtonRef = useRef<HTMLInputElement | null>(null);

  const handleClickUploadButton = () => {
    imageUploadButtonRef?.current?.click();
  };

  return (
    <div className="rounded-[24px] text-center align-middle h-[160px] flex flex-col justify-center">
      <div>
        <p className="body-16-bold">사진을 추가해주세요.</p>
        <p className="py-[8px] body-14-regular">
          *기록당 최대 1개 업로드가 가능해요.
        </p>
        <button onClick={handleClickUploadButton}>
          <Plus />
        </button>
        <input className="hidden" type="file" ref={imageUploadButtonRef} />
      </div>
    </div>
  );
}
