'use client';

import OnboardingModal from '@components/Onboarding/modal';

import ThirdStepIcon from '/public/assets/icon_onboarding/third_step.svg';

export default function page() {
  return (
    <div>
      <OnboardingModal
        title={`기록을 많이 남길수록
        또밥이가 성장해요!`}
        content={`다녀온 맛집 기록을 남겨보세요.
        5개 이상 남기면 레벨이 올라가요!`}
      >
        <ThirdStepIcon />
      </OnboardingModal>
    </div>
  );
}
