import { PropsWithChildren } from 'react';

import DeleteTrashButton from '../DeleteTrashButton';

import cn from '@utils/cn';

export interface BasicListItem {
  isLast: boolean;
  hasDeleteOption: boolean;
  onClick?: () => void;
}

export default function ListItem({
  isLast,
  hasDeleteOption,
  onClick,
  children,
}: PropsWithChildren<BasicListItem>) {
  return (
    <>
      <li className="w-full pl-[24px] pr-[16px] flex justify-between items-center">
        <div
          className={`${cn(
            'flex justify-between items-center pt-2 pb-4 w-full',
            {
              'border-b-gray-100 border-b-[1px]': !isLast,
            },
          )}`}
        >
          <div className="flex flex-col gap-[9px]">{children}</div>
          {hasDeleteOption && <DeleteTrashButton onClick={onClick} />}
        </div>
      </li>
    </>
  );
}
