import FilledStar50Icon from '/public/assets/icon24/star50_24.svg';
import DefaultStarSmallIcon from '/public/assets/icon24/star_default_24.svg';
import FilledStarSmallIcon from '/public/assets/icon24/star_filled_24.svg';

interface StarByRatingProps {
  filled: boolean;
  half: boolean;
}

export default function StarByRating({ filled, half }: StarByRatingProps) {
  if (filled) return <FilledStarSmallIcon />;
  else if (half) return <FilledStar50Icon />;
  return <DefaultStarSmallIcon />;
}
