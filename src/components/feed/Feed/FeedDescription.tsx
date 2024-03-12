'use client';

import { useRouter } from 'next/navigation';

import RightArrowLogo from 'public/assets/icon20/right_arrow_20.svg';

interface FeedDescriptionProps {
  id: number;
  description: string;
}

export default function FeedDescription({
  description,
  id,
}: FeedDescriptionProps) {
  const { push } = useRouter();
  const handleClickFeedDetailButton = () => {
    // TODO: 피드 상세 페이지 이동 로직 작성
    push(`/feed/detail/${id}`);
  };
  return (
    <div className="flex justify-between items-center gap-[8px]">
      <p className="body-14-regular flex-grow line-clamp-2">{description}</p>
      <button
        className="w-[20px] h-[20px]"
        onClick={handleClickFeedDetailButton}
      >
        <RightArrowLogo />
      </button>
    </div>
  );
}
