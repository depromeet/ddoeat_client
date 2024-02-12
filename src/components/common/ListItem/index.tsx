import { PropsWithChildren } from 'react';
import { toast } from 'sonner';

import DeleteTrashButton from '../DeleteTrashButton';

import cn from '@utils/cn';

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
  const handleReviewReport = () => {
    toast('신고 기능은 아직 개발중이에요!');
  };

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
        {hasReportOption && (
          <div className="caption-12-bold" onClick={handleReviewReport}>
            신고
          </div>
        )}
      </div>
    </li>
  );
}
