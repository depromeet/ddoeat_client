import VisitNumberFlag from '@components/common/VisitNumberFlag';
import cn from '@utils/cn';
import TrashIcon from 'public/assets/icon24/trash_24.svg';
import { useDeleteLog } from '@api/useDeleteLog';
import StarScore from '@components/common/StarScore';

type ListType = 'search' | 'storeDetail' | 'bookmark';

interface StoreProps {
  storeId: string;
  name: string;
  menuType?: string;
  score?: number;
  location?: string;
  distance?: string;
  revisitNum: number;
  hasDeleteOption: boolean;
  isLast: boolean;
  listType: ListType;
}

type StoreComponentProps = Omit<
  StoreProps,
  'listType' | 'hasDeleteOption' | 'isLast'
>;

export default function Store({
  storeId,
  name,
  menuType,
  score,
  location,
  distance,
  revisitNum,
  hasDeleteOption,
  isLast,
  listType,
}: StoreProps) {
  const { mutate: deleteLog } = useDeleteLog();
  const handleClickDeleteButton = () => {
    // TODO: 추후 로그 삭제 로직 확정
    deleteLog(storeId);
  };

  const printStoreContents = (type: ListType) => {
    switch (type) {
      case 'search':
        return (
          <StoreInSearch
            storeId={storeId}
            name={name}
            menuType={menuType}
            revisitNum={revisitNum}
            distance={distance}
            location={location}
          />
        );
      case 'bookmark':
        return (
          <StoreInBookmark
            storeId={storeId}
            name={name}
            revisitNum={revisitNum}
            menuType={menuType}
            location={location}
          />
        );
      case 'storeDetail':
        return (
          <StoreInStoreDetail
            storeId={storeId}
            name={name}
            revisitNum={revisitNum}
            score={score}
          />
        );
    }
  };
  return (
    <li className="w-full pl-[24px] pr-[16px] pt-[8px] flex justify-between items-center">
      <div
        className={`${cn('flex justify-between items-center pt-2 pb-4 w-full', {
          'border-b-gray-100 border-b-[1px]': !isLast,
        })}`}
      >
        {printStoreContents(listType)}
        {hasDeleteOption && (
          <button onClick={handleClickDeleteButton}>
            <TrashIcon />
          </button>
        )}
      </div>
    </li>
  );
}

const StoreInSearch = ({
  name,
  menuType,
  revisitNum,
  distance,
  location,
}: StoreComponentProps) => {
  return (
    <div className="flex flex-col gap-[9px]">
      <div className="flex items-center gap-[4px]">
        <p className="body-16-bold">{name}</p>
        <p className="caption-12-bold text-gray-500">{menuType}</p>
        {revisitNum > 0 && <VisitNumberFlag visitNum={revisitNum} />}
      </div>
      <div className="flex caption-12-bold">
        <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
          {distance}
        </p>
        <p>{location}</p>
      </div>
    </div>
  );
};

const StoreInStoreDetail = ({
  name,
  revisitNum,
  score,
}: StoreComponentProps) => {
  return (
    <div className="flex flex-col gap-[9px]">
      <div className="flex items-center gap-[4px]">
        <p className="body-16-bold">{name}</p>
        {revisitNum > 0 && <VisitNumberFlag visitNum={revisitNum} />}
      </div>
      <StarScore rating={score as number} />
    </div>
  );
};

const StoreInBookmark = ({
  name,
  revisitNum,
  menuType,
  location,
}: StoreComponentProps) => {
  return (
    <div className="flex flex-col gap-[9px]">
      <div className="flex items-center gap-[4px]">
        <p className="body-16-bold">{name}</p>
        {revisitNum > 0 && <VisitNumberFlag visitNum={revisitNum} />}
      </div>
      <div className="flex caption-12-bold">
        <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
          {menuType}
        </p>
        <p>{location}</p>
      </div>
    </div>
  );
};
