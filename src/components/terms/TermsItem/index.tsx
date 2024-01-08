import { InputHTMLAttributes, useState } from 'react';

import CheckDefault from 'public/assets/icon24/check_default_24.svg';
import CheckFill from 'public/assets/icon24/check_fill_24.svg';
import DownArrow from 'public/assets/icon24/down_arrow_24.svg';
import UpArrow from 'public/assets/icon24/up_arrow_24.svg';

interface TermsItemProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export default function TermsItem({
  title,
  checked,
  onChange,
  ...restProps
}: TermsItemProps) {
  const [isOpenTermsItem, setIsOpenTermsItem] = useState(false);

  const handleClickArrowButton = () => {
    setIsOpenTermsItem((prev) => !prev);
  };

  return (
    <li className="pl-[32px] pr-[16px]">
      <div className="flex justify-between py-[12px]">
        <label className="flex gap-[4px] items-center pl-[8px]">
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={onChange}
            className="hidden"
            {...restProps}
          />
          {checked ? <CheckFill /> : <CheckDefault />}
          <p className="body-14-extraBold">{title}</p>
        </label>
        <button onClick={handleClickArrowButton}>
          {isOpenTermsItem ? <UpArrow /> : <DownArrow />}
        </button>
      </div>
      {/* TODO: 추후 약관 확정 시 추가 */}
      {isOpenTermsItem && <p className="pl-[16px] pt-[4px]">description</p>}
    </li>
  );
}
