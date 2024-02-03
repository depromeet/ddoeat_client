import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import OnboardingModal from '@components/onboarding/Modal';
import { pageTransitionVariant } from '@constants/motions';

interface SceneProps {
  step: number;
  title: string;
  content: string;
  videoUrl: string;
  gifUrl: string;
  icon: string;
  onNextStep: () => void;
}

export default function Scene({
  step,
  title,
  content,
  // videoUrl,
  gifUrl,
  onNextStep,
}: SceneProps) {
  const router = useRouter();
  const [buttonActive, setButtonActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* TODO: IOS 영상 이슈 대응 필요 */
  // const handleVideoEnd = () => {
  // setButtonActive(true);
  // };

  useEffect(() => {
    setTimeout(() => {
      setButtonActive(true);
    }, 2000);
  }, [router, step]);

  const handleClickNext = () => {
    onNextStep();
    setButtonActive(false);
    if (step + 1 === 4) return router.push('/');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      className="absolute w-full h-full flex justify-center items-center"
      variants={pageTransitionVariant}
      key={step}
      initial="initial"
      animate={['animate', 'opacity']}
    >
      {/* <video
        src={videoUrl}
        autoPlay
        className="absolute object-cover top-0 h-full w-full"
        playsInline
        muted
        key={videoUrl}
        onEnded={handleVideoEnd}
      /> */}
      <Image
        src={gifUrl}
        alt="onboarding_gif"
        fill
        unoptimized={true}
        priority
        onLoad={handleImageLoad}
      />
      {imageLoaded && (
        <OnboardingModal
          title={title}
          content={content}
          step={step}
          isButtonActive={buttonActive}
          onNextStep={handleClickNext}
        />
      )}
    </motion.div>
  );
}
