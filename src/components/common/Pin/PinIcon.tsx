import PinBowlOneIcon from '/public/assets/icon44/pin_bowl1_44.svg';
import PinBowlTwoIcon from '/public/assets/icon44/pin_bowl2_44.svg';
import PinBowlThreeIcon from '/public/assets/icon44/pin_bowl3_44.svg';
import BookmarkIcon from '/public/assets/icon44/bookmark_44.svg';
import BookmarkSamllIcon from '/public/assets/icon30/bookmark_30.svg';
import PinBowlSamllIcon from '/public/assets/icon30/pin_bowl_30.svg';

interface PinIconProps {
  isBookmarked: boolean;
  totalRevisitedCnt: number;
  mapLevel: number;
}

export const PinIcon = ({
  isBookmarked,
  totalRevisitedCnt,
  mapLevel,
}: PinIconProps) => {
  if (isBookmarked) {
    if (mapLevel > 5) return <BookmarkSamllIcon />;

    return <BookmarkIcon />;
  }

  if (mapLevel > 5) return <PinBowlSamllIcon />;

  return (
    <>
      {totalRevisitedCnt >= 15 && <PinBowlThreeIcon />}
      {totalRevisitedCnt >= 5 && totalRevisitedCnt < 15 && <PinBowlTwoIcon />}
      {totalRevisitedCnt < 5 && <PinBowlOneIcon />}
    </>
  );
};
