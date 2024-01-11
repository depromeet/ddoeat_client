'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import StepButton from '../StepButton';

import { OnboardingContentProps } from '@constants/onboarding';

interface OnboardingModalProps extends HTMLAttributes<HTMLDivElement> {
  onboardingData: OnboardingContentProps[];
  step: number;
}

export default function OnboardingModal({
  onboardingData,
  step,
  children,
}: OnboardingModalProps) {
  const [buttonActive, setButtonActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // TODO: 영상 총 길이만큼 delay 수정
    setTimeout(() => {
      setButtonActive(true);
    }, 2000);
  }, [router, step]);

  const handleClickNextButton = () => {
    const nextStepNumber = Number(step) + 1;
    console.log('hello');
    if (nextStepNumber == 4) return router.push('/');
    router.push(`/onboarding/${nextStepNumber}`);
  };

  return (
    <div className="h-[288px] flex flex-col justify-item items-center py-[20px] bg-white absolute z-10 inset-x-0 bottom-0">
      {children}
      <div className="w-full h-[132px] flex flex-col justify-item items-center place-content-center px-[24px] py-[37px] gap-[8px]">
        <p className="text-gray-900 header-22 whitespace-pre-line text-center">
          {onboardingData[step - 1].title}
        </p>
        <p className="text-gray-700 body-14-regular whitespace-pre-line text-center">
          {onboardingData[step - 1].content}
        </p>
      </div>
      <div className="w-full h-[112px] flex justify-center items-center">
        {buttonActive && (
          <StepButton onClick={handleClickNextButton} step={step} />
        )}
      </div>
    </div>
  );
}
