import ListItem from '@components/common/ListItem';
import type { BasicListItem } from '@components/common/ListItem';
import Tag from '@components/common/Tag';

interface SearchItemProps extends Omit<BasicListItem, 'hasDeleteOption'> {
  storeName: string;
  categoryType: string;
  totalRevisitedCount: number;
  distance: string;
  address: string;
}

export default function SearchItem({
  isLast,
  storeName,
  categoryType,
  totalRevisitedCount,
  distance,
  address,
}: SearchItemProps) {
  return (
    <ListItem isLast={isLast} hasDeleteOption={false}>
      <div className="flex items-center gap-[4px]">
        <p className="body-16-bold">{storeName}</p>
        <p className="caption-12-bold text-gray-500">{categoryType}</p>
        {totalRevisitedCount > 0 && (
          <Tag size={'small'} className="bg-primary-100 text-primary-500">
            {totalRevisitedCount}명 재방문
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
