import DdobabSadIcon from 'public/assets/ddobab/ddobab_sad.svg';
import DdobabSpoonIcon from 'public/assets/ddobab/ddobab_spoon.svg';

export default function NoSearchResult() {
  return (
    <div className="flex flex-col gap-[36px]">
      <p className="text-center body-14-regular text-gray-900">
        검색 결과가 없습니다.
      </p>
      <div className="flex flex-col gap-[8px]">
        <DdobabSadIcon />
        <DdobabSpoonIcon />
      </div>
    </div>
  );
}
