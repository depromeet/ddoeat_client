export type BackgroundType = 1 | 2 | 3;

interface BackgroundVideoProps {
  step: number;
}

const BackgroundAttributes: {
  [key: number]: string;
} = {
  // TODO: 비디오 주소 업데이트
  1: '/video/video.mp4',
  2: '/video/video.mp4',
  3: '/video/onboarding_3.mp4',
};

export default function BackgroundVideo({ step }: BackgroundVideoProps) {
  const src = BackgroundAttributes[step];

  return (
    <video
      src={src}
      autoPlay
      className="absolute top-0 object-cover h-full w-full"
      muted
      key={step}
    />
  );
}
