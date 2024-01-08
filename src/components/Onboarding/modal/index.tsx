'use client';

import { HTMLAttributes } from 'react';

interface OnboardingModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}

export default function OnboardingModal({
  title,
  content,
  children,
}: OnboardingModalProps) {
  return (
    // 스타일 수정되면 반영하기..
    <div className="w-full h-[268px] flex flex-col justify-item items-center py-[20px] bg-white absolute z-10 inset-x-0 bottom-0">
      {children}
      <div className="w-full h-[132px] flex flex-col justify-item items-center place-content-center px-[24px] py-[37px] gap-[8px]">
        <p className="text-gray-900 header-22 whitespace-pre-line text-center">
          {title}
        </p>
        <p className="text-gray-700 body-14-regular whitespace-pre-line text-center">
          {content}
        </p>
      </div>
      {/* TODO: 버튼 어떻게 넣을지? */}
      <div className="w-full h-[112px]">호잇</div>
    </div>
  );
}
