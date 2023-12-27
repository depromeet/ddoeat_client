import FilledStarSmall from 'public/assets/img/filled_star_24.svg';
import DefaultStarSmall from 'public/assets/img/default_star_24.svg';

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  // TODO: 별점 불러올 때 소수점 반올림할 지 버릴지 논의 필요
  const filledStars = Math.round(rating); // Filled Star 개수 결정

  // TODO: 별점 구간별로 별 ui 어떻게 보여줄 지 디자인과 논의 후 수정 필요
  const getStarsNum = Array.from({ length: 5 }).map((_, index) => (
    <div key={index}>
      {index < filledStars ? <FilledStarSmall /> : <DefaultStarSmall />}
    </div>
  ));

  return <div className="flex flex-row items-center">{getStarsNum}</div>;
}
