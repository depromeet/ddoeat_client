import { MouseEvent } from 'react';

import AnimatePortal from '../AnimatePortal';

interface DeleteModal {
  isShowing: boolean;
  onClick: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  isShowing,
  onClick,
  onCancel,
}: DeleteModal) {
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <AnimatePortal isShowing={isShowing}>
      <div className="absolute top-0 z-overlay">
        <div
          className="w-[100dvw] h-[100dvh] bg-black bg-opacity-50 absolute top-0"
          onClick={handleOutsideClick}
        />
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-[300px] h-[188px] bg-white flex items-center justify-center flex-col p-[24px] rounded-[24px] z-toast">
            <div className="mb-[32px]  text-center">
              <p className="body-16-bold mb-[12px]">정말 기록을 삭제할까요?</p>
              <p className="caption-12-regular">
                기록 삭제시 복구가 불가능하고, <br /> 등록된 가게 정보가 사라질
                수 있어요.
              </p>
            </div>
            <div className="flex gap-[12px]">
              <button
                className="w-[120px] h-[49px] bg-gray-300 rounded-[24px]"
                onClick={onCancel}
              >
                취소
              </button>
              <button
                className="w-[120px] h-[49px] bg-primary-300 text-white rounded-[24px]"
                onClick={onClick}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePortal>
  );
}
