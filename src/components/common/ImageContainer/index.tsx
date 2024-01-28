import Image, { ImageProps } from 'next/image';

import cn from '@utils/cn';

type ImageType = 'profile' | 'small' | 'medium' | 'full';

interface ImageContainerProps extends ImageProps {
  type: ImageType;
}

interface ImageAttributes {
  width: string;
  height: string;
  radius: string;
}

const getImageAttributes = (type: ImageType): ImageAttributes => {
  switch (type) {
    case 'profile':
      return {
        width: 'w-[100px]',
        height: 'h-[100px]',
        radius: 'rounded-full',
      };
    case 'small':
      return {
        width: 'w-[100px]',
        height: 'h-[100px]',
        radius: 'rounded-[20px]',
      };
    case 'medium':
      return {
        width: 'w-[343px]',
        height: 'h-[150px]',
        radius: 'rounded-[20px]',
      };
    case 'full':
      return {
        width: 'w-full',
        height: 'h-[280px]',
        radius: 'rounded-none',
      };
  }
};

export default function ImageContainer({
  type,
  className,
  ...restProps
}: ImageContainerProps) {
  const { width, height, radius } = getImageAttributes(type);

  return (
    <div className={cn(`relative ${width} ${height} ${radius}`, className)}>
      <Image fill className="object-cover" {...restProps} />
    </div>
  );
}
