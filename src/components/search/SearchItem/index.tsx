import ListItem from '@components/common/ListItem';
import type { BasicListItem } from '@components/common/ListItem';
import Tag from '@components/common/Tag';

interface SearchItemProps extends Omit<BasicListItem, 'hasDeleteOption'> {
  storeName: string;
  categoryName: string;
  revisitedCount: number;
  distance: string;
  address: string;
}

export default function SearchItem({
  listId,
  isLast,
  storeName,
  categoryName,
  revisitedCount,
  distance,
  address,
}: SearchItemProps) {
  return (
    <ListItem listId={listId} isLast={isLast} hasDeleteOption={false}>
      <div className="flex items-center gap-[4px]">
        <p className="body-16-bold">{storeName}</p>
        <p className="caption-12-bold text-gray-500">{categoryName}</p>
        {revisitedCount > 0 && (
          <Tag size={'small'} className="bg-primary-100 text-primary-500">
            {revisitedCount}명 재방문
          </Tag>
        )}
      </div>
      <div className="flex caption-12-bold">
        <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
          {distance}
        </p>
        <p>{address}</p>
      </div>
    </ListItem>
  );
}
