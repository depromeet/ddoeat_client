import { HTMLAttributes } from 'react';
import Image from 'next/image';

import storeImg from 'public/assets/image/search/store.png';
import VisitNumberFlag from '@components/common/VisitNumberFlag';
import cn from '@utils/cn';
import TrashIcon from 'public/assets/icon24/trash_24.svg';
import { useDeleteLog } from '@hooks/api/useDeleteLog';

interface StoreProps extends HTMLAttributes<HTMLLIElement> {
  storeId: string;
  storeImgUrl?: string;
  storeName: string;
  menuType: string;
  visitNum: number;
  hasDeleteOption: boolean;
  isLast: boolean;
}

export default function Store({
  storeId,
  storeImgUrl,
  storeName,
  menuType,
  visitNum,
  hasDeleteOption,
  isLast,
}: StoreProps) {
  const { mutate: deleteLog } = useDeleteLog();
  const handleClickDeleteButton = () => {
    // TODO: 추후 로그 삭제 로직 확정
    deleteLog(storeId);
  };
  return (
    <li className="w-full px-4 pt-2 flex justify-between items-center">
      <div
        className={`${cn('flex justify-between items-center pt-2 pb-4 w-full', {
          'border-b-gray-100 border-b-[1px]': isLast,
        })}`}
      >
        <div className="flex gap-2">
          <Image
            // TODO: 추후 맛집 이미지 없을 시, 제공하는 기본 이미지로 변경 (현재는 mock image)
            // NOTE: 가게 기본 이미지 서버 response로 내려줄지 논의 후 변경 예정
            src={storeImgUrl ?? storeImg}
            alt={storeName}
            width={60}
            height={60}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <p className="body-16-bold">{storeName}</p>
              {visitNum && <VisitNumberFlag visitNum={visitNum} />}
            </div>
            <div className="flex caption-12-bold">
              <p className="after:inline-block after:w-[0.5px] after:h-[10px] after:bg-gray-300 after:mx-2">
                {menuType}
              </p>
              {/* TODO: 예린님 별점 컴포넌트 삽입 */}
            </div>
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
