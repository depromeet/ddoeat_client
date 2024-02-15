import { PropsWithChildren } from 'react';

import DeleteTrashButton from '../DeleteTrashButton';

import cn from '@utils/cn';
import ReviewReportButton from '@components/main/StoreDetailSection/Reviews/ReportButton';

export interface BasicListItem {
  isLast: boolean;
  hasDeleteOption: boolean;
  hasReportOption?: boolean;
  onClick?: () => void;
}

export default function ListItem({
  isLast,
  hasDeleteOption,
  hasReportOption,
  onClick,
  children,
}: PropsWithChildren<BasicListItem>) {
  return (
    <li className="w-full pt-[8px] pl-[24px] pr-[16px] flex justify-between items-center">
      <div
        className={`${cn(
          'flex justify-between items-center pt-[8px] pb-[16px] w-full',
          {
            'border-b-gray-100 border-b-[1px]': !isLast,
          },
        )}`}
      >
        <div className="flex flex-col gap-[9px]">{children}</div>
        {hasDeleteOption && <DeleteTrashButton onClick={onClick} />}
        {hasReportOption && <ReviewReportButton />}
      </div>
    </li>
  );
}
