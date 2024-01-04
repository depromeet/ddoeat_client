import { useRouter } from 'next/navigation';

import PlusIcon from 'public/assets/icon16/plus_16.svg';

export default function AddStoreButton() {
  const { push } = useRouter();

  const handleClickAddStoreButton = () => {
    push('/search');
  };

  return (
    <button
      className="flex gap-[8px] items-center h-[56px] rounded-[99px] px-[32px] py-[16px] bg-gray-900"
      onClick={handleClickAddStoreButton}
    >
      <PlusIcon />
      <p className="body-14-extraBold text-white">내 맛집 기록하기</p>
    </button>
  );
}
