'use client';

import { ButtonHTMLAttributes } from 'react';

import Button from '../Button';

import BookmarkIcon from 'public/assets/icon24/bookmark_default_24.svg';
import usePatchBookmark from '@hooks/api/usePatchBookmark';
import cn from '@utils/cn';

interface BookmarkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  storeId: number;
  isBookmarked: boolean;
}

export default function BookmarkButton({
  storeId,
  isBookmarked,
  className,
  ...restProps
}: BookmarkButtonProps) {
  const { mutate: toggleBookmark } = usePatchBookmark();

  const handleBookmarkButtonClick = () => {
    // TODO: 북마크 mutate(patch) 호출하기
    toggleBookmark(storeId);
  };

  return (
    <Button
      onClick={handleBookmarkButtonClick}
      className={cn(
        'w-[84px] bg-gray-100 shrink-0 active:bg-gray-300 group',
        className,
      )}
      {...restProps}
    >
      <BookmarkIcon
        className={cn('fill-gray-300', {
          'fill-primary-500': isBookmarked,
          'group-active:fill-gray-500': !isBookmarked,
        })}
      />
    </Button>
  );
}
