import StarByRating from './StarByRating';

const TOTAL_STAR_COUNT = 5;

const renderStars = (formattedRating: number) => {
  const filledStars = Math.floor(formattedRating);
  const decimalRating = formattedRating - filledStars;

  return Array.from({ length: TOTAL_STAR_COUNT }).map((_, index) => {
    const isFilledStar = index < filledStars;
    const isHalfStar = index === filledStars && decimalRating >= 0.5;
    return <StarByRating key={index} filled={isFilledStar} half={isHalfStar} />;
  });
};

interface StarScoreProps {
  rating: number;
}

export default function StarScore({ rating }: StarScoreProps) {
  const formattedRating = rating.toFixed(1);

  return (
    <div className="flex gap-[4px] items-center body-16-bold text-primary-500">
      <span>{formattedRating}</span>
      <div className="flex">{renderStars(rating)}</div>
    </div>
  );
}
