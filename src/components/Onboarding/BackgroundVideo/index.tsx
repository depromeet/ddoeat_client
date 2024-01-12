export type BackgroundType = 1 | 2 | 3;

interface BackgroundVideoProps {
  step: number;
}

// const BackgroundAttributes = {
//   // TODO : 비디오 주소 update
//   1: '/video/video.mp4',
//   2: '/video/video.mp4',
//   3: '/video/video.mp4',
// };

export default function BackgroundVideo({ step }: BackgroundVideoProps) {
  // const src = BackgroundAttributes[step];

  return (
    <video
      src={require('public/video/video.mp4')}
      autoPlay
      className="absolute top-0 object-cover h-full w-full"
      muted
      key={step}
    />
  );
}
