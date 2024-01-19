import { HTMLAttributes } from 'react';
import Image from 'next/image';

import StepButton from '@components/Onboarding/stepButton';

interface OnboardingModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
  icon: string;
  step: number;
  isButtonActive: boolean;
  onNextStep: () => void;
}

export default function OnboardingModal({
  title,
  content,
  icon,
  step,
  isButtonActive,
  onNextStep,
}: OnboardingModalProps) {
  return (
    <div className="h-[288px] flex flex-col justify-item items-center py-[20px] bg-white absolute z-above inset-x-0 bottom-0">
      <Image width={'40'} height={'4'} src={icon} alt={'stepIcon'} />
      <div className="w-full h-[132px] flex flex-col justify-item items-center place-content-center px-[24px] py-[32px] gap-[8px]">
        <p className="text-gray-900 header-22 whitespace-pre-line text-center">
          {title}
        </p>
        <p className="text-gray-700 body-14-regular whitespace-pre-line text-center">
          {content}
        </p>
      </div>
      <div className="w-full h-[112px] flex justify-center items-center">
        {isButtonActive && <StepButton onClick={onNextStep} step={step} />}
      </div>
    </div>
  );
}
