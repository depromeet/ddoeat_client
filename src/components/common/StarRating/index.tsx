import FilledStarSmall from 'public/assets/img/FilledStarSmall.svg';
import EmptyStarSmall from 'public/assets/img/EmptyStarSmall.svg';

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  // 별점 불러올 때 소수점 반올림할 지 버릴지 논의 필요
  const filledStars = Math.round(rating); // Filled Star 개수 결정

  const getStarsNum = Array.from({ length: 5 }).map((_, index) => (
    <div key={index}>
      {index < filledStars ? <FilledStarSmall /> : <EmptyStarSmall />}
    </div>
  ));

  return <div className="flex flex-row items-center">{getStarsNum}</div>;
}
