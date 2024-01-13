import { motion } from 'framer-motion';

// TODO: 컴포넌트 폴더 & 파일 대소문자 통일
import BackgroundVideo from '../BackgroundVideo';
import OnboardingModal from '../modal';
import StepIcon from '../stepIcon';

import { pageTransitionVariant } from '@constants/motions';
import { ONBOARDING_CONTENT } from '@constants/onboarding';

interface SceneProps {
  step: number;
}

export default function Scene({ step }: SceneProps) {
  const onboardingData = ONBOARDING_CONTENT;

  return (
    <motion.div
      className="absolute w-full h-full flex justify-center items-center hidden"
      variants={pageTransitionVariant}
      key={step}
      initial="initial"
      animate={['animate', 'opacity']}
      exit="exit"
    >
      <BackgroundVideo step={step} />
      <OnboardingModal step={step} onboardingData={onboardingData}>
        <StepIcon step={step} />
      </OnboardingModal>
    </motion.div>
  );
}

//Content는 기본적으로 hidden으로 되어 있는데, 다음 버튼 누르면 step+1이 initiate되는 형태로.
