import BookmarkButton from './BookmarkButton';
import WriteLogButton from './WriteLogButton';

interface WriteLogBookmarkButtonProps {
  storeId: string;
  isBookmarked: boolean;
}

function WriteLogBookmarkButton({
  storeId,
  isBookmarked,
}: WriteLogBookmarkButtonProps) {
  return (
    <div className="flex w-full h-[62px] rounded-[16px] overflow-hidden">
      <WriteLogButton storeId={storeId} />
      <BookmarkButton storeId={storeId} isBookmarked={isBookmarked} />
    </div>
  );
}

export default WriteLogBookmarkButton;
