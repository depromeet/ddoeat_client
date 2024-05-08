'use client';

import { usePathname } from 'next/navigation';

import { Feed } from '@components/feed/Feed';
import { useGetFeedDetail } from '@hooks/api/useGetFeedDetail';
import BottomNavigation from '@components/common/BottomNavigation';

export default function Page() {
  const pathname = usePathname();
  const feedId = pathname.split('/')[pathname.split('/').length - 1];
  const { data: feedDetailData } = useGetFeedDetail(Number(feedId));

  return (
    <div className="mt-[56px]">
      {feedDetailData && (
        <Feed>
          <Feed.Profile
            userId={feedDetailData.userId}
            src={feedDetailData.profileImageUrl}
            nickName={feedDetailData.nickname}
            alt="프로필 이미지"
            isMyFeed={feedDetailData.isMine}
            isFollowed={feedDetailData.isFollowed}
          />
          <Feed.Image
            src={feedDetailData.feedImageUrl}
            alt="피드 음식 사진"
            storeName={feedDetailData.feedStoreResponse?.storeName}
            storeCategory={feedDetailData.feedStoreResponse?.kakaoCategoryName}
            storeLocation={feedDetailData.feedStoreResponse?.address}
            storeResponse={feedDetailData.feedStoreResponse}
          />
          <Feed.DetailDescription description={feedDetailData.description} />
          <Feed.Date className="text-black caption-12-regular -mt-[4px]">
            {feedDetailData.createdAt}
          </Feed.Date>
        </Feed>
      )}
      <BottomNavigation />
    </div>
  );
}
