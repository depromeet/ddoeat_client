import Image, { ImageProps } from 'next/image';

import cn from '@utils/cn';

interface MyPageFeedProps extends ImageProps {}

export default function MyPageFeed({
  src,
  alt,
  className,
  ...props
}: MyPageFeedProps) {
  return (
    <div className={cn('relative aspect-square w-[calc(100%/3)]', className)}>
      <Image src={src} alt={alt} fill {...props} className="shadow-feed" />
    </div>
  );
}
