import { InputHTMLAttributes } from 'react';

import CheckboxDefault from 'public/assets/icon24/checkbox_default_24.svg';
import cn from '@utils/cn';

export default function AllTermsCheckBox({
  checked,
  onChange,
  ...restProps
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex gap-[4px] items-center w-full h-[56px] bg-gray-100 p-[16px] rounded-[32px]">
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
        className="hidden"
        {...restProps}
      />
      <CheckboxDefault
        className={cn({
          'fill-gray-300': !checked,
          'fill-primary-500': checked,
        })}
      />
      <p className="text-gray-900 body-16-bold">약관 전체 동의</p>
    </label>
  );
}
