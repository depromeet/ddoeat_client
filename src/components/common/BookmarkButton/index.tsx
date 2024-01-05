'use client';

import Button from '../Button';

import usePatchBookmark from '@hooks/api/usePatchBookmark';

interface BookmarkButtonProps {
  storeId: string;
  isBookmarked: boolean;
}

export default function BookmarkButton({
  storeId,
  isBookmarked,
}: BookmarkButtonProps) {
  const { mutate: toggleBookmark } = usePatchBookmark();

  const handleBookmarkButtonClick = () => {
    // TODO: 북마크 mutate(patch) 호출하기
    toggleBookmark(storeId);
  };

  return (
    <Button
      onClick={handleBookmarkButtonClick}
      className="w-[84px] bg-gray-100 shrink-0 active:bg-gray-300"
    >
      {isBookmarked ? (
        //   TODO:아이콘이 확정되지 않아 더미 div로 대체. 아이콘 확정시 변경하기
        <div className="w-[24px] h-[24px] bg-primary-500" />
      ) : (
        //   TODO:아이콘이 확정되지 않아 더미 div로 대체. 아이콘 확정시 변경하기
        <div className="w-[24px] h-[24px] bg-primary-100" />
      )}
    </Button>
  );
}
