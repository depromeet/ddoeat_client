import { PanInfo, motion } from 'framer-motion';
import { useState } from 'react';
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClickNext = () => {
    onNextStep();
    if (step + 1 === 4) return router.push('/');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDragEnd = (event: DragEvent, info: PanInfo) => {
    if (info.offset.x < -50) {
      if (step + 1 === 4) return router.push('/');
      onNextStep();
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full flex justify-center items-center"
      variants={pageTransitionVariant}
      key={step}
      initial="initial"
      animate={['animate']}
      drag="x"
      dragDirectionLock
      dragSnapToOrigin={true}
      dragElastic={{ left: 0.1, right: 0 }}
      dragConstraints={{ left: 0.8, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      {/* TODO: IOS 영상 이슈 대응 필요 */}
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
          onNextStep={handleClickNext}
        />
      )}
    </motion.div>
  );
}
