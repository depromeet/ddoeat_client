import { InputHTMLAttributes, useState } from 'react';

import { TermsType } from '@constants/terms';
import CheckDefault from 'public/assets/icon24/check_default_24.svg';
import CheckFill from 'public/assets/icon24/check_fill_24.svg';
import DownArrow from 'public/assets/icon24/down_arrow_24.svg';
import UpArrow from 'public/assets/icon24/up_arrow_24.svg';
import Description from '@components/terms/Description';

interface TermsItemProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  termsType: TermsType;
}

export default function TermsItem({
  title,
  termsType,
  checked,
  onChange,
  ...restProps
}: TermsItemProps) {
  const [isOpenTermsItem, setIsOpenTermsItem] = useState(false);

  const handleClickArrowButton = () => {
    setIsOpenTermsItem((prev) => !prev);
  };

  return (
    <li className="pl-[32px] pr-[16px] text-gray-900">
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
      {isOpenTermsItem && termsType !== 'PRIVACY_POLICY' && (
        <Description type={termsType} />
      )}
      {isOpenTermsItem && termsType === 'PRIVACY_POLICY' && (
        <iframe
          className="w-full h-[calc(100dvh-482px)]"
          src="https://plip.kr/pcc/15a1d059-78a0-46c3-b9f7-33dc5685f9a5/privacy/1.html"
        >
          해당 앱은 iframe을 지원하지 않습니다.
        </iframe>
      )}
    </li>
  );
}
