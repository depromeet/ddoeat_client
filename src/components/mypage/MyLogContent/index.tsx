'use client';

import MyLog from '../Log';

import { DEFAULT_CONTENTS_SIZE } from '@constants/mypage';
import { useDeleteLog } from '@hooks/api/useDeleteLog';
import { useInfiniteGetMyLog } from '@hooks/api/useInfiniteMyLog';
import useObserver from '@hooks/useObserver';

export default function MyLogContent() {
  const {
    data: myLog,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteGetMyLog({
    size: DEFAULT_CONTENTS_SIZE,
  });
  const { mutate: deleteLog } = useDeleteLog();

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  };

  const { setTarget } = useObserver({
    onIntersect,
    threshold: 1,
  });

  const handleDeleteLog = (id: number) => {
    deleteLog(id);
  };

  return (
    <div className="mx-[16px] overflow-y-auto h-[calc(100dvh-361px)]">
      {myLog &&
        !myLog[0].data.empty &&
        myLog?.map((page) => {
          return page.data.content.map((item) => {
            return (
              <MyLog
                key={item.reviewId}
                onClick={() => handleDeleteLog(item.reviewId)}
                {...item}
              />
            );
          });
        })}
      {!isLoading && hasNextPage && <div ref={setTarget} />}
    </div>
  );
}
