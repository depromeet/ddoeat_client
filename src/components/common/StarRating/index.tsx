import FilledStarSmall from 'public/assets/img/FilledStarSmall.svg';
import EmptyStarSmall from 'public/assets/img/EmptyStarSmall.svg';

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const filledStars = Math.floor(rating); // 소수점 이하를 버리고, Filled Star 개수 결정
  const emptyStars = 5 - filledStars; // 전체 별의 개수에서 Filled Star 개수를 뺀 나머지는 Empty Star 개수

  const getStarNum = (count: number, type: 'filled' | 'empty') => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <div key={i}>
          {type === 'filled' ? <FilledStarSmall /> : <EmptyStarSmall />}
        </div>,
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-row items-center">
      {getStarNum(filledStars, 'filled')}
      {getStarNum(emptyStars, 'empty')}
    </div>
  );
}
