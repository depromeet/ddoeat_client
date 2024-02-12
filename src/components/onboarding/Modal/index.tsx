import { HTMLAttributes } from 'react';

import StepButton from '@components/onboarding/StepButton';
import StepIcon from '@components/onboarding/StepIcon';

interface OnboardingModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
  step: number;
  onNextStep: () => void;
}

export default function OnboardingModal({
  title,
  content,
  step,
  onNextStep,
}: OnboardingModalProps) {
  return (
    <div className="h-[288px] flex flex-col justify-item items-center py-[20px] bg-white absolute inset-x-0 bottom-0">
      <StepIcon step={step} />
      <div className="w-full h-[132px] flex flex-col justify-item items-center place-content-center px-[24px] py-[32px] gap-[8px]">
        <p className="text-gray-900 header-22 whitespace-pre-line text-center">
          {title}
        </p>
        <p className="text-gray-700 body-14-regular whitespace-pre-line text-center">
          {content}
        </p>
      </div>
      <div className="w-full h-[112px] flex justify-center items-center">
        <StepButton onClick={onNextStep} step={step} />
      </div>
    </div>
  );
}
