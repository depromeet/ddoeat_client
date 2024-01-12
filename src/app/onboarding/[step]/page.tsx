'use client';

import { AnimatePresence, motion } from 'framer-motion';

import OnboardingModal from '@components/onboarding/Modal';
import StepIcon from '@components/onboarding/StepIcon';
import { ONBOARDING_CONTENT } from '@constants/onboarding';
import { pageTransitionVariant } from '@constants/motions';
import BackgroundVideo from '@components/onboarding/BackgroundVideo';
// import BackgroundVideo, {
//   BackgroundType,
// } from '@components/onboarding/BackgroundVideo';

export default function Page({ params }: { params: { step: number } }) {
  const onboardingData = ONBOARDING_CONTENT;

  return (
    // TODO: AnimatePresence exit 적용안되는 오류 수정
    <AnimatePresence mode="wait">
      <BackgroundVideo step={1} />
      <motion.div
        className="absolute w-full h-full flex justify-center items-center"
        variants={pageTransitionVariant}
        key={params.step}
        initial="initial"
        animate={['animate', 'opacity']}
        exit="exit"
      >
        <OnboardingModal step={params.step} onboardingData={onboardingData}>
          <StepIcon step={params.step} />
        </OnboardingModal>
      </motion.div>
    </AnimatePresence>
  );
}
