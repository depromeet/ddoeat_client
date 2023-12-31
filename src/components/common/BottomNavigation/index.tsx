import { useRouter } from 'next/navigation';

import BottomNaviagtionButton from './button';

import AddRoundButton from 'public/assets/icon56/add_round_btn_56.svg';
import ProfileDefault from 'public/assets/icon24/profile_default_24.svg';
import ProfilieFilled from 'public/assets/icon24/profile_filled_24.svg';
import MapFilled from 'public/assets/icon24/map_filled_24.svg';
import MapDefault from 'public/assets/icon24/map_default_24.svg';

export default function BottomNavigation() {
  const { push } = useRouter();

  const handleClickPlusButton = () => {
    push('/search');
  };

  const handleClickLocationButton = () => {};

  const handleClickProfileButton = () => {
    push('/mypage');
  };

  return (
    <div className="flex justify-between items-center w-full rounded-[32px] h-[88px] px-[24px] py-[16px] bg-gray-900">
      <div className="flex gap-2 h-full">
        <button onClick={handleClickPlusButton}>
          <AddRoundButton />
        </button>
        <div className="text-gray-50 flex flex-col justify-center">
          <p className="body-14-extraBold">내맛집을</p>
          <p className="body-14-extraBold">등록해보세요!</p>
        </div>
      </div>
      <div className="flex gap-2 h-full">
        <BottomNaviagtionButton onClick={handleClickLocationButton}>
          <MapFilled />
          <MapDefault />
        </BottomNaviagtionButton>
        <BottomNaviagtionButton onClick={handleClickProfileButton}>
          <ProfilieFilled />
          <ProfileDefault />
        </BottomNaviagtionButton>
      </div>
    </div>
  );
}
