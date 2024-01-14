import { motion } from 'framer-motion';

// TODO: 컴포넌트 폴더 & 파일 대소문자 통일
import BackgroundVideo from '@components/Onboarding/BackgroundVideo';
import OnboardingModal from '@components/Onboarding/modal';
import { pageTransitionVariant } from '@constants/motions';
import { ONBOARDING_CONTENT } from '@constants/onboarding';

interface SceneProps {
  step: number;
  onNextStep: () => void;
}

const onboardingData = ONBOARDING_CONTENT;

export default function Scene({ step, onNextStep }: SceneProps) {
  return (
    <motion.div
      className="absolute w-full h-full flex justify-center items-center"
      variants={pageTransitionVariant}
      key={step}
      initial="initial"
      animate={['animate', 'opacity']}
    >
      <BackgroundVideo step={step} />
      <OnboardingModal
        step={step}
        onboardingData={onboardingData}
        onNextStep={onNextStep}
      />
    </motion.div>
  );
}
