'use client';

import PinBowlOneIcon from '/public/assets/icon56/pin_bowl1_56.svg';
import PinBowlTwoIcon from '/public/assets/icon56/pin_bowl2_56.svg';
import PinBowlThreeIcon from '/public/assets/icon56/pin_bowl3_56.svg';
import BookmarkIcon from '/public/assets/icon56/bookmark_56.svg';

import { ButtonHTMLAttributes } from 'react';

interface MarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isVisited: boolean;
  isBookmarked: boolean;
  userVisitCount: number;
  totalVisitCount: number;
}

export default function Marker({
  isVisited,
  isBookmarked,
  userVisitCount,
  totalVisitCount,
}: MarkerProps) {
  // TODO: 마커 클릭 후 바텀시트 올라오는 로직 수정하기
  // const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // const openBottomSheet = () => {
  //   setBottomSheetOpen(true);
  // };

  const getIcon = () => {
    return isVisited ? (
      <div className="flex flex-col justify-center items-center">
        <p className="header-22 text-white">
          {userVisitCount > 99 ? '99+' : userVisitCount}
        </p>
        <p className="caption-10-bold text-white">방문</p>
      </div>
    ) : isBookmarked ? (
      <BookmarkIcon />
    ) : (
      <div>
        {totalVisitCount >= 15 && <PinBowlThreeIcon />}
        {totalVisitCount >= 5 && totalVisitCount < 15 && <PinBowlTwoIcon />}
        {totalVisitCount < 5 && <PinBowlOneIcon />}
      </div>
    );
  };

  const getPinColor = () => {
    return !isVisited && !isBookmarked ? 'bg-white' : 'bg-primary-300';
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-[56px] h-[56px] rounded-[50%] bg-white pin-shadow`}
      // onClick={openBottomSheet}
    >
      <div
        className={`flex flex-col justify-center items-center w-[53px] h-[53px] rounded-[50%] ${getPinColor()}`}
      >
        <span>{getIcon()}</span>
      </div>
    </div>
  );
}
