import MyLog from '../Log';

import { DEFAULT_CONTENTS_SIZE } from '@constants/mypage';
import { useInfiniteGetMyLog } from '@hooks/api/useInfiniteMyLog';
import useObserver from '@hooks/useObserver';

export default function MyLogContent() {
  const { data: myLog, fetchNextPage } = useInfiniteGetMyLog({
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
        myLog.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data.content.map((item, index, arr) => (
              <div
                key={index}
                ref={index === arr.length - 1 ? setTarget : null}
              >
                <MyLog
                  logId={item.reviewId}
                  date={item.visitedAt}
                  log={item.description}
                  menuType={item.visitedAt}
                  rating={item.rating}
                  storeName={item.storeName}
                  myVisitNum={item.visitTimes}
                  storeImgUrl={item.imageUrl}
                />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
