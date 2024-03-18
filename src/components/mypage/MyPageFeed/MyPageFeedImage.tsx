import Image, { ImageProps } from 'next/image';

export default function MyPageFeedImage({ src, alt }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className="w-full aspect-[4/5] rounded-[16px] overflow-hidden"
    />
  );
}
