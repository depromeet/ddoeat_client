import MyLog from '../Log';

import { DEFAULT_CONTENTS_SIZE } from '@constants/mypage';
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

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  };

  const { setTarget } = useObserver({
    onIntersect,
    threshold: 1,
  });

  return (
    <div className="mx-[16px]">
      {myLog &&
        !myLog[0].data.empty &&
        myLog?.map((page) => {
          return page.data.content.map((item) => {
            return <MyLog key={item.reviewId} {...item} />;
          });
        })}
      {!isLoading && hasNextPage && <div ref={setTarget} />}
    </div>
  );
}
