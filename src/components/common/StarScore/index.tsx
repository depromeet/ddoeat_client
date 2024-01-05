import FilledStar50Icon from '/public/assets/icon24/star50_24.svg';
import DefaultStarSmallIcon from '/public/assets/img/default_star_24.svg';
import FilledStarSmallIcon from '/public/assets/img/filled_star_24.svg';

interface StarScoreProps {
  rating: number;
}

export default function StarScore({ rating }: StarScoreProps) {
  const formattedRating = rating.toFixed(1);
  const filledStars = Math.floor(rating);
  const decimalRating = rating - Math.floor(rating);

  const renderStars = Array.from({ length: 5 }).map((_, index) => {
    const StarIcon =
      index < filledStars ? (
        <FilledStarSmallIcon />
      ) : index === filledStars && decimalRating >= 0.5 ? (
        <FilledStar50Icon />
      ) : (
        <DefaultStarSmallIcon />
      );

    return <div key={index}>{StarIcon}</div>;
  });
  return (
    <div className="flex flex-row gap-x-[4px] items-center body-16-bold text-primary-500">
      <span> {formattedRating} </span>
      <div className="flex flex-row"> {renderStars}</div>
    </div>
  );
}
