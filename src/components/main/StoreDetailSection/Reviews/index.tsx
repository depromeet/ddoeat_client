import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import SectionTitle from '../SectionTitle';

import cn from '@utils/cn';
import useObserver from '@hooks/useObserver';
import { useDeleteLog } from '@hooks/api/useDeleteLog';
import { useGetStoreFeedList } from '@hooks/api/useGetFeedList';
import { Feed } from '@components/feed/Feed';

export default function Reviews() {
  const [activeTag, setActiveTag] = useState<'REVISITED' | 'PHOTO' | null>(
    null,
  );

  const searchParams = useSearchParams();

  const storeId = Number(searchParams.get('storeId'));

  const params = {
    storeId: storeId ?? 0,
  };

  const { data, fetchNextPage, isLoading, hasNextPage } =
    useGetStoreFeedList(params);
  const { mutate: deleteLog } = useDeleteLog();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTagClick = (tag: 'REVISITED' | 'PHOTO' | null) => () => {
    setActiveTag((prevTag) => (prevTag === tag ? null : tag));
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  };

  const { setTarget } = useObserver({
    onIntersect,
    threshold: 0.5,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteLog = (id: number) => {
    deleteLog(id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatTagClassName = (tag: 'REVISITED' | 'PHOTO') => {
    return cn({
      'bg-gray-500 text-white': activeTag === tag,
      'bg-gray-100 text-gray-500': activeTag !== tag,
    });
  };

  return (
    <div>
      <div className="px-[16px]  pb-[8px]">
        <SectionTitle>방문기록</SectionTitle>
        {/* <div className="flex gap-[8px]">
          <Tag
            size="large"
            className={formatTagClassName('REVISITED')}
            onClick={handleTagClick('REVISITED')}
          >
            재방문만
          </Tag>
          <Tag
            size="large"
            className={formatTagClassName('PHOTO')}
            onClick={handleTagClick('PHOTO')}
          >
            사진 리뷰만
          </Tag>
        </div> */}
      </div>

      <div className="mx-[16px]">
        {data && !data[0].data.empty ? (
          data?.map((page) => {
            return page.data.content.map((feed) => {
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
                    src={feed.feedImg}
                    alt={`${feed.feedStoreResponse.storeName} 이미지`}
                    storeName={feed.feedStoreResponse.storeName}
                    storeCategory={feed.feedStoreResponse.kakaoCategoryName}
                    storeLocation={feed.feedStoreResponse.address}
                    storeResponse={feed.feedStoreResponse}
                  />
                  <Feed.Description
                    id={feed.feedId}
                    description={feed.description}
                  />
                </Feed>
              );
            });
          })
        ) : (
          <div className="w-full h-[160px] flex flex-col gap-[8px] items-center justify-center  bg-gray-100 text-gray-900 rounded-[24px] mb-[8px]">
            <p className="body-16-bold">아직 기록이 없어요!</p>
            <p className="body-14-regular">
              기록 작성 버튼을 눌러 첫 기록을 작성해주세요.
            </p>
          </div>
        )}
        {!isLoading && hasNextPage && <div ref={setTarget} className="h-1" />}
      </div>
    </div>
  );
}
