'use client';

import OnboardingModal from '@components/onboarding/Modal';
import StepIcon from '@components/onboarding/StepIcon';
import { ONBOARDING_CONTENT } from '@constants/onboarding';

export default function page({ params }: { params: { step: number } }) {
  const onboardingData = ONBOARDING_CONTENT;

  return (
    // TODO: 페이지 전환 애니메이션 효과 넣기
    <div className="relative w-full h-full flex justify-center items-center">
      {/* TODO: 영상 넣기 */}
      <OnboardingModal step={params.step} onboardingData={onboardingData}>
        <StepIcon step={params.step} />
      </OnboardingModal>
    </div>
  );
}
