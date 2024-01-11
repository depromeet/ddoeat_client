'use client';

import { AnimatePresence, motion } from 'framer-motion';

import OnboardingModal from '@components/onboarding/Modal';
import StepIcon from '@components/onboarding/StepIcon';
import { ONBOARDING_CONTENT } from '@constants/onboarding';
import { pageTransitionVariant } from '@constants/motions';

export default function Page({ params }: { params: { step: number } }) {
  const onboardingData = ONBOARDING_CONTENT;

  return (
    // TODO: AnimatePresence exit 적용안되는 오류 수정
    <AnimatePresence mode="wait">
      <motion.div
        className="absolute w-full h-full flex justify-center items-center"
        variants={pageTransitionVariant}
        key={params.step}
        initial="initial"
        animate={['animate', 'opacity']}
        exit="exit"
      >
        {/* TODO: 영상 넣기 */}
        <OnboardingModal step={params.step} onboardingData={onboardingData}>
          <StepIcon step={params.step} />
        </OnboardingModal>
      </motion.div>
    </AnimatePresence>
  );
}
