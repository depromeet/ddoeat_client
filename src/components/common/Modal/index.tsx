import { MouseEvent } from 'react';

import AnimatePortal from '../AnimatePortal';

import type { ModalProps } from 'src/types/modal';
import cn from '@utils/cn';

export default function Modal({
  isShowing,
  text,
  subText,
  controls,
  onCancel,
}: ModalProps) {
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <AnimatePortal isShowing={isShowing}>
      <div className="absolute top-0 z-overlay">
        <div
          className="w-[100dvw] max-w-[480px] h-[100dvh] bg-black bg-opacity-50 absolute top-0"
          onClick={handleOutsideClick}
        />
        <div className="flex items-center justify-center w-[100dvw] max-w-[480px] h-[100dvh]">
          <div className="w-[300px] h-[188px] bg-white flex items-center justify-center flex-col p-[24px] rounded-[24px] z-toast">
            <div className="mb-[32px]  text-center">
              <p className="body-16-bold mb-[12px]">{text}</p>
              <p className="caption-12-regular">{subText}</p>
            </div>
            <div className="flex gap-[12px] text-gray-900">
              {controls.map(({ buttonText, buttonHandler }, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-[120px] h-[40px] bg-gray-300 rounded-[24px]',
                    {
                      'bg-gray-300': index !== controls.length - 1,
                      'bg-primary-300 text-white':
                        index === controls.length - 1,
                    },
                  )}
                  onClick={buttonHandler}
                >
                  {buttonText}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatePortal>
  );
}
