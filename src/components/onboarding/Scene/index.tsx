import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import OnboardingModal from '@components/onboarding/Modal';
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
        playsInline
        muted
        key={videoUrl}
        onEnded={handleVideoEnd}
      />
      <OnboardingModal
        title={title}
        content={content}
        step={step}
        isButtonActive={buttonActive}
        onNextStep={handleClickNext}
      />
    </motion.div>
  );
}
