import Image, { ImageProps } from 'next/image';

import cn from '@utils/cn';

type ImageType = 'profile' | 'small' | 'medium' | 'full';

interface ImageContainerProps extends ImageProps {
  type: ImageType;
}

interface ImageAttributes extends Pick<ImageProps, 'width' | 'height'> {
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

export default function ImageContainer({
  type,
  className,
  ...restProps
}: ImageContainerProps) {
  const { width, height, radius } = getImageAttributes(type);

  return (
    <Image
      width={width}
      height={height}
      className={cn(radius, className)}
      {...restProps}
    />
  );
}
