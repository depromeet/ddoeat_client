import { motion } from 'framer-motion';
// TODO: 컴포넌트 폴더 & 파일 대소문자 통일
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import OnboardingModal from '@components/Onboarding/modal';
import { pageTransitionVariant } from '@constants/motions';

interface SceneProps {
  step: number;
  title: string;
  content: string;
  videoUrl: string;
  icon: string;
  onNextStep: () => void;
}

export default function Scene({
  step,
  title,
  content,
  videoUrl,
  icon,
  onNextStep,
}: SceneProps) {
  const router = useRouter();
  const [buttonActive, setButtonActive] = useState(false);

  const handleVideoEnd = () => {
    setButtonActive(true);
  };

  const handleClickNext = () => {
    onNextStep();
    setButtonActive(false);
    if (step + 1 === 4) return router.push('/');
  };

  return (
    <motion.div
      className="absolute w-full h-full flex justify-center items-center"
      variants={pageTransitionVariant}
      key={step}
      initial="initial"
      animate={['animate', 'opacity']}
    >
      <video
        src={videoUrl}
        autoPlay
        className="absolute top-0 object-cover h-full w-full"
        muted
        key={videoUrl}
        onEnded={handleVideoEnd}
      />
      <OnboardingModal
        title={title}
        content={content}
        icon={icon}
        step={step}
        isButtonActive={buttonActive}
        onNextStep={handleClickNext}
      />
    </motion.div>
  );
}
