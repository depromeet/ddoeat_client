// import { useRouter } from 'next/navigation';

import AddStoreButton from './AddStoreButton';

export default function BottomNavigation() {
  // const { push } = useRouter();

  // const handleClickLocationButton = () => {
  //   // NOTE: 현재 내 위치로 이동
  // };

  // const handleClickProfileButton = () => {
  //   push('/mypage');
  // };

  return (
    <div className="flex justify-between gap-[16px] w-full h-[128px] px-[24px] py-[16px]">
      {/* NOTE: 은지님 FloatingButton 삽입 */}
      <AddStoreButton />
    </div>
  );
}
