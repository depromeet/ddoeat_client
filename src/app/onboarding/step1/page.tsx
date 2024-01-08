'use client';

import OnboardingModal from '@components/Onboarding/modal';

import FirstStepIcon from '/public/assets/icon_onboarding/first_step.svg';
import BackgroundImg from '/public/assets/icon_onboarding/bgImg.svg';

import Marker from '@components/Pin';

export default function page() {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* 메인 화면 끄아 */}
      <div className="relative flex justify-center">
        <BackgroundImg />
        <div className="absolute z-10 top-[25%]">
          <Marker isBookmarked={false} totalVisitCount={3} />
        </div>
      </div>
      <OnboardingModal
        title={'재방문 맛집을 지도에 표시했어요'}
        content={'많은 사람이 재방문한 곳일수록 그릇이 많아요!'}
      >
        <FirstStepIcon />
      </OnboardingModal>
    </div>
  );
}
