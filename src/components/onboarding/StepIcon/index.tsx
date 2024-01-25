'use client';

import FirstStepIcon from '/public/assets/icon_onboarding/first_step.svg';
import SecondStepIcon from '/public/assets/icon_onboarding/second_step.svg';
import ThirdStepIcon from '/public/assets/icon_onboarding/third_step.svg';

interface StepIconProps {
  step: number;
}

export default function StepIcon({ step }: StepIconProps) {
  if (step == 1) return <FirstStepIcon />;
  else if (step == 2) return <SecondStepIcon />;
  return <ThirdStepIcon />;
}
