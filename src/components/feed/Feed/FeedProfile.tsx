'use client';

import Image, { ImageProps } from 'next/image';
import { useRouter } from 'next/navigation';

interface FeedProfileProps extends ImageProps {
  nickName: string;
  onClickFollowButton?: () => void;
  isMyFeed: boolean;
}

export default function FeedProfile({
  id,
  src,
  alt,
  nickName,
  isMyFeed,
  onClickFollowButton,
  ...props
}: FeedProfileProps) {
  const { push } = useRouter();
  const handleClickProfile = () => {
    push(`/feed/detail/${id}`);
  };
  return (
    <div className="flex justify-between items-center w-full body-14-bold">
      <div className="flex gap-[8px] items-center">
        <div
          className="relative w-[36px] h-[36px] rounded-[50%] overflow-hidden"
          onClick={handleClickProfile}
        >
          <Image alt={alt} src={src} fill {...props} />
        </div>
        <p>{nickName}</p>
      </div>
      {!isMyFeed && <button onClick={onClickFollowButton}>팔로우</button>}
    </div>
  );
}
