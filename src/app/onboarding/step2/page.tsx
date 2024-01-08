'use client';

import OnboardingModal from '@components/Onboarding/modal';

import SecondStepIcon from '/public/assets/icon_onboarding/second_step.svg';

export default function page() {
  return (
    <div>
      <OnboardingModal
        title={'내 맛집을 기록해보세요'}
        content={`
        가고 싶은 곳을 북마크하고, 방문 후 기록을 남겨보세요.
        나의 맛집 지도가 완성될 거예요!`}
      >
        <SecondStepIcon />
      </OnboardingModal>
    </div>
  );
}
