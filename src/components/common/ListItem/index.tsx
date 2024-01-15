import { PropsWithChildren } from 'react';

import cn from '@utils/cn';
import TrashIcon from 'public/assets/icon24/trash_24.svg';
import { useDeleteLog } from '@hooks/api/useDeleteLog';

export interface BasicListItem {
  listId: number;
  isLast: boolean;
  hasDeleteOption: boolean;
}

export default function ListItem({
  listId,
  isLast,
  hasDeleteOption,
  children,
}: PropsWithChildren<BasicListItem>) {
  const { mutate: deleteLog } = useDeleteLog();

  const handleClickDeleteButton = () => {
    // TODO: 추후 로그 삭제 로직 확정
    deleteLog(listId);
  };
  return (
    <li className="w-full pl-[24px] pr-[16px] flex justify-between items-center">
      <div
        className={`${cn('flex justify-between items-center pt-2 pb-4 w-full', {
          'border-b-gray-100 border-b-[1px]': !isLast,
        })}`}
      >
        <div className="flex flex-col gap-[9px]">{children}</div>
        {hasDeleteOption && (
          <button onClick={handleClickDeleteButton}>
            <TrashIcon />
          </button>
        )}
      </div>
    </li>
  );
}
