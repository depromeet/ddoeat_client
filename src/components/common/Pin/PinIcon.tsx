import PinBowlOneIcon from '/public/assets/icon44/pin_bowl1_44.svg';
import PinBowlTwoIcon from '/public/assets/icon44/pin_bowl2_44.svg';
import PinBowlThreeIcon from '/public/assets/icon44/pin_bowl3_44.svg';
import BookmarkIcon from '/public/assets/icon44/bookmark_44.svg';

interface PinIconProps {
  isBookmarked: boolean;
  totalVisitCount: number;
}

export const PinIcon = ({ isBookmarked, totalVisitCount }: PinIconProps) => {
  if (isBookmarked) return <BookmarkIcon />;

  return (
    <>
      {totalVisitCount >= 15 && <PinBowlThreeIcon />}
      {totalVisitCount >= 5 && totalVisitCount < 15 && <PinBowlTwoIcon />}
      {totalVisitCount < 5 && <PinBowlOneIcon />}
    </>
  );
};
