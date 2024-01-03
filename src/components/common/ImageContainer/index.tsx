import Image from 'next/image';

type ImageType = 'profile' | 'small' | 'medium' | 'full';

interface ImageContainerProps {
  type: ImageType;
  src: string;
}

interface ImageAttributes {
  width: number;
  height: number;
  radius: string;
}

const getImageAttributes = (type: ImageType): ImageAttributes => {
  switch (type) {
    case 'profile':
      return { width: 100, height: 100, radius: 'rounded-full' };
    case 'small':
      return { width: 100, height: 100, radius: 'rounded-[20px]' };
    case 'medium':
      return { width: 343, height: 150, radius: 'rounded-[20px]' };
    case 'full':
      return { width: 375, height: 280, radius: 'rounded-none' };
  }
};

export default function ImageContainer({ type, src }: ImageContainerProps) {
  const { width, height, radius } = getImageAttributes(type);

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="image"
      className={radius}
    />
  );
}
