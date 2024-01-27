import PinBowlOneIcon from '/public/assets/icon44/pin_bowl1_44.svg';
import PinBowlTwoIcon from '/public/assets/icon44/pin_bowl2_44.svg';
import PinBowlThreeIcon from '/public/assets/icon44/pin_bowl3_44.svg';
import BookmarkIcon from '/public/assets/icon44/bookmark_44.svg';

interface PinIconProps {
  isBookmarked: boolean;
  totalRevisitedCount: number;
}

export const PinIcon = ({
  isBookmarked,
  totalRevisitedCount,
}: PinIconProps) => {
  if (isBookmarked) return <BookmarkIcon />;

  return (
    <>
      {totalRevisitedCount >= 15 && <PinBowlThreeIcon />}
      {totalRevisitedCount >= 5 && totalRevisitedCount < 15 && (
        <PinBowlTwoIcon />
      )}
      {totalRevisitedCount < 5 && <PinBowlOneIcon />}
    </>
  );
};
