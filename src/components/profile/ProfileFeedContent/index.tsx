import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { MyPageFeed } from '../MyPageFeed';

import { useInfiniteGetProfileFeed } from '@hooks/api/useInfiniteGetProfileFeed';
import useObserver from '@hooks/useObserver';

export default function ProfileFeedContent() {
  const pathname = usePathname();
  const userId = Number(pathname.split('/')[2]);

  const {
    data: profileFeed,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteGetProfileFeed({ userId });

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
    <div>
      <div className="w-full grid grid-cols-2 gap-[8px] mb-[24px]">
        {profileFeed &&
          !profileFeed[0].data.empty &&
          profileFeed.map((feedList) =>
            feedList.data.content.map((feed) => {
              return (
                <Link href={`/feed/detail/${feed.feedId}`} key={feed.feedId}>
                  <MyPageFeed>
                    <MyPageFeed.StoreInfo
                      storeName={feed.storeName}
                      storeCategory="양식"
                      storeLocation={feed.address}
                    />
                    <MyPageFeed.Image src={feed.feedImageUrl} alt="음식 사진" />
                  </MyPageFeed>
                </Link>
              );
            }),
          )}
        {!isLoading && hasNextPage && <div ref={setTarget} className="h-1" />}
      </div>
    </div>
  );
}
