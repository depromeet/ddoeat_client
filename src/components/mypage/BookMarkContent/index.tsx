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
  const [selectedTag, setSelectedTag] =
    useState<(typeof tags)[number]['id']>('total');

  const {
    data: bookMark,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteGetBookMark({
    size: DEFAULT_CONTENTS_SIZE,
  });

  console.log(bookMark);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  };

  const { setTarget } = useObserver({
    onIntersect,
    threshold: 1,
  });

  const handleTagClick = (tagId: (typeof tags)[number]['id']): void => {
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

  return (
    <>
      <div className="flex gap-[8px] pl-[16px]">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            size="large"
            className={cn({
              'bg-gray-500 text-white': selectedTag === tag.id,
              'bg-gray-100 text-gray-500': selectedTag !== tag.id,
            })}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.label} {calculateTagDataCount(tag.id)}
          </Tag>
        ))}
      </div>

      <div className="mx-[16px]">
        {bookMark &&
          !bookMark[0].data.empty &&
          bookMark.map((page) => {
            return page.data.content
              .filter((item) => filterByTag(item, selectedTag))
              .map((item) => {
                return (
                  <BookmarkItem
                    key={item.bookmarkId}
                    listId={item.bookmarkId}
                    isLast={false}
                    location={item.address}
                    menuType={item.categoryName}
                    revisitNum={item.totalRevisitedCount}
                    storeName={item.storeName}
                  />
                );
              });
          })}
        {!isLoading && hasNextPage && <div ref={setTarget} />}
      </div>
    </>
  );
}
