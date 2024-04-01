import Image, { ImageProps } from 'next/image';

export default function MyPageFeedImage({ src, alt }: ImageProps) {
  return (
    <div className="w-full aspect-[4/5] relative">
      <Image
        src={src}
        alt={alt}
        className="rounded-[16px] overflow-hidden"
        fill
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}
