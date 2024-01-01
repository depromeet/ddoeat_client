import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomNaviagtionButton from './button';

import AddRoundButton from 'public/assets/icon56/add_round_btn_56.svg';
import ProfileDefault from 'public/assets/icon24/profile_default_24.svg';
import ProfilieFilled from 'public/assets/icon24/profile_filled_24.svg';
import MapFilled from 'public/assets/icon24/map_filled_24.svg';

export default function BottomNavigation() {
  const [isProfileButtonActive, setIsProfileButtonActive] = useState(false);
  const { push } = useRouter();

  const handleClickPlusButton = () => {
    push('/search');
  };

  const handleClickLocationButton = () => {
    // NOTE: 지도 새로고침
    // 지도, 마이페이지에서 노출되는 BottomNavigation이 지도페이지에서만 노출되는 것으로 변경
  };

  const handleClickProfileButton = () => {
    setIsProfileButtonActive(true);
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
        </BottomNaviagtionButton>
        <BottomNaviagtionButton onClick={handleClickProfileButton}>
          {isProfileButtonActive ? <ProfilieFilled /> : <ProfileDefault />}
        </BottomNaviagtionButton>
      </div>
    </div>
  );
}
