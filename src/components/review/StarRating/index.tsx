import DefaultStarIcon from 'public/assets/icon40/star_default_40.svg';
import FilledStarIcon from 'public/assets/icon40/star_filled_40.svg';

const starNum = 5;

interface StarRatingProps {
  rating: number;
  onClick: (index: number) => void;
}

export default function StarRating({ rating, onClick }: StarRatingProps) {
  return (
    <div className="bg-white rounded-[24px] w-full h-[118px] flex flex-col justify-center items-center">
      <div>
        <p className="body-16-bold text-center">만족도를 평가해주세요.</p>
        <div className="flex pt-[8px]">
          {Array.from({ length: starNum }).map((_, index) =>
            index < rating ? (
              <FilledStarIcon key={index} onClick={onClick(index)} />
            ) : (
              <DefaultStarIcon key={index} onClick={onClick(index)} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
