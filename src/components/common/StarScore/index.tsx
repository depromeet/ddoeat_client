import FilledStar20Icon from '/public/assets/icon24/star20_24.svg';
import FilledStar40Icon from '/public/assets/icon24/star40_24.svg';
import FilledStar60Icon from '/public/assets/icon24/star60_24.svg';
import FilledStar80Icon from '/public/assets/icon24/star80_24.svg';
import DefaultStarSmallIcon from '/public/assets/img/default_star_24.svg';
import FilledStarSmallIcon from '/public/assets/img/filled_star_24.svg';
interface StarScoreProps {
  rating: number;
}

export default function StarScore({ rating }: StarScoreProps) {
  const formattedRating = rating.toFixed(1);
  const filledStars = Math.floor(rating);
  const decimalRating = rating - Math.floor(rating);

  const getStarsNum = Array.from({ length: 5 }).map((_, index) => {
    const StarIcon =
      index < filledStars ? (
        <FilledStarSmallIcon />
      ) : index === filledStars && decimalRating >= 0.8 ? (
        <FilledStar80Icon />
      ) : index === filledStars && decimalRating >= 0.6 ? (
        <FilledStar60Icon />
      ) : index === filledStars && decimalRating >= 0.4 ? (
        <FilledStar40Icon />
      ) : index === filledStars && decimalRating <= 0.4 ? (
        <FilledStar20Icon />
      ) : (
        <DefaultStarSmallIcon />
      );

    return <div key={index}>{StarIcon}</div>;
  });
  return (
    <div className="flex flex-row gap-x-[4px] items-center body-16-bold text-primary-500">
      <span> {formattedRating} </span>
      <div className="flex flex-row"> {getStarsNum}</div>
    </div>
  );
}
