import { useState } from 'react';

import BookmarkItem from '../BookmarkItem';

import useObserver from '@hooks/useObserver';
import { DEFAULT_CONTENTS_SIZE } from '@constants/mypage';
import {
  ContentData,
  useInfiniteGetBookMark,
} from '@hooks/api/useInfiniteBookMark';
import Tag from '@components/common/Tag';
import cn from '@utils/cn';
import usePatchBookmark from '@hooks/api/usePatchBookmark';

interface TagType {
  id: 'total' | 'after' | 'before';
  label: string;
}

const tags: TagType[] = [
  { id: 'total', label: '전체' },
  { id: 'after', label: '방문후' },
  { id: 'before', label: '방문전' },
];

const filterByTag = (item: ContentData, tag: TagType['id']) => {
  if (tag === 'total') return true;
  if (tag === 'after') return item.isVisited;
  if (tag === 'before') return !item.isVisited;
};

export default function BookMarkContent() {
  const [selectedTag, setSelectedTag] = useState<TagType['id']>('total');

  const {
    data: bookMark,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteGetBookMark({
    size: DEFAULT_CONTENTS_SIZE,
  });
  const { mutate: deleteBookmark } = usePatchBookmark();

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  };

  const { setTarget } = useObserver({
    onIntersect,
    threshold: 0.5,
  });

  const handleTagClick = (tagId: TagType['id']): void => {
    setSelectedTag(tagId);
  };

  const calculateTagDataCount = (tag: TagType['id']): number => {
    if (!bookMark) return 0;

    return bookMark.reduce((acc, page) => {
      return (
        acc + page.data.content.filter((item) => filterByTag(item, tag)).length
      );
    }, 0);
  };

  const handleDeleteItem = (id: number) => {
    deleteBookmark(id);
  };

  return (
    <>
      <div className="flex gap-[8px] px-[16px] py-[12px]">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            size="large"
            className={cn('py-[8px] px-[16px]', {
              'bg-gray-500 text-white': selectedTag === tag.id,
              'bg-gray-100 text-gray-500': selectedTag !== tag.id,
            })}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.label} {calculateTagDataCount(tag.id)}
          </Tag>
        ))}
      </div>

      <div className="mx-[16px]  overflow-y-auto h-[calc(100dvh-418px)]">
        {bookMark &&
          !bookMark[0].data.empty &&
          bookMark.map((page) => {
            return page.data.content
              .filter((item) => filterByTag(item, selectedTag))
              .map((item) => {
                return (
                  <BookmarkItem
                    key={item.bookmarkId}
                    isLast={false}
                    storeId={item.storeId}
                    location={item.address}
                    menuType={item.categoryName}
                    revisitNum={item.totalRevisitedCount}
                    storeName={item.storeName}
                    onClick={() => handleDeleteItem(item.storeId)}
                  />
                );
              });
          })}
        {!isLoading && hasNextPage && <div ref={setTarget} className="h-1" />}
      </div>
    </>
  );
}
