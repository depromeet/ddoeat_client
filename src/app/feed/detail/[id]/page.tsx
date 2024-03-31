'use client';

import { Feed } from '@components/feed/Feed';
import { useGetFeedDetail } from '@hooks/api/useGetFeedDetail';

export default function Page() {
  const { data: feedDetailData } = useGetFeedDetail(1);

  return (
    <div className="mt-[56px]">
      {feedDetailData && (
        <Feed>
          <Feed.Profile
            id="1"
            src={feedDetailData.profileImg}
            nickName={feedDetailData.nickname}
            alt="프로필 이미지"
            isMyFeed={false}
          />
          <Feed.Image
            src={feedDetailData.feedImg}
            alt="피드 음식 사진"
            storeName={feedDetailData.storeName}
            storeCategory={feedDetailData.kakaoCategoryName}
            storeLocation={feedDetailData.address}
          />
          <Feed.DetailDescription description={feedDetailData.description} />
          <Feed.Date className="text-black caption-12-regular -mt-[4px]">
            {feedDetailData.createdAt}
          </Feed.Date>
        </Feed>
      )}
    </div>
  );
}
