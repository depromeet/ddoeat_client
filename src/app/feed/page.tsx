'use client';

import { useGetFeedList } from '@hooks/api/useGetFeedList';
import useObserver from '@hooks/useObserver';
import { Feed } from '@components/feed/Feed';
import BottomNavigation from '@components/common/BottomNavigation';

export default function Page() {
  const {
    data: feedList,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useGetFeedList();

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      fetchNextPage();
    }
  };

  const { setTarget } = useObserver({
    onIntersect,
    threshold: 0.5,
  });

  return (
    <>
      <div className="flex flex-col gap-[32px] py-[16px]">
        {feedList &&
          !feedList[0].data.empty &&
          feedList.map((feedList) =>
            feedList.data.content.map((feed) => {
              return (
                <Feed key={feed.feedId}>
                  <Feed.Date>{feed.createdAt}</Feed.Date>
                  <Feed.Profile
                    userId={feed.userId}
                    src={feed.profileImageUrl}
                    nickName={feed.nickname}
                    alt={`${feed.userId} 프로필 이미지`}
                    isMyFeed={feed.isMine}
                    isFollowed={feed.isFollowed}
                  />
                  <Feed.Image
                    src={feed.feedImageUrl}
                    alt={`${feed.feedStoreResponse?.storeName} 이미지`}
                    storeName={feed.feedStoreResponse?.storeName}
                    storeCategory={feed.feedStoreResponse?.kakaoCategoryName}
                    storeLocation={feed.feedStoreResponse?.address}
                    storeResponse={feed.feedStoreResponse}
                  />
                  <Feed.Description
                    id={feed.feedId}
                    description={feed.description}
                  />
                </Feed>
              );
            }),
          )}
        {!isLoading && hasNextPage && <div ref={setTarget} className="h-1" />}
        <BottomNavigation />
      </div>
    </>
  );
}
