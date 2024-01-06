import { HTMLAttributes } from 'react';

import VisitNumberFlag from '@components/common/VisitNumberFlag';
import cn from '@utils/cn';
import TrashIcon from 'public/assets/icon24/trash_24.svg';
import { useDeleteLog } from '@api/useDeleteLog';

interface StoreProps extends HTMLAttributes<HTMLLIElement> {
  storeId: string;
  storeName: string;
  menuType: string;
  location: string;
  revisitNum: number;
  hasDeleteOption: boolean;
  isLast: boolean;
}

export default function Store({
  storeId,
  storeName,
  menuType,
  location,
  revisitNum,
  hasDeleteOption,
  isLast,
}: StoreProps) {
  const { mutate: deleteLog } = useDeleteLog();
  const handleClickDeleteButton = () => {
    // TODO: 추후 로그 삭제 로직 확정
    deleteLog(storeId);
  };
  return (
    <li className="w-full pl-[24px] pr-[16px] pt-[8px] flex justify-between items-center">
      <div
        className={`${cn('flex justify-between items-center pt-2 pb-4 w-full', {
          'border-b-gray-100 border-b-[1px]': isLast,
        })}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <p className="body-16-bold">{storeName}</p>
            {revisitNum > 0 && <VisitNumberFlag visitNum={revisitNum} />}
          </div>
          <div className="flex caption-12-bold">
            <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
              {menuType}
            </p>
            <p>{location}</p>
          </div>
        </div>
        {hasDeleteOption && (
          <button onClick={handleClickDeleteButton}>
            <TrashIcon />
          </button>
        )}
      </div>
    </li>
  );
}
