import { HTMLAttributes } from 'react';

import CheckBoxFill from 'public/assets/icon24/checkbox_fill_24.svg';
import CheckboxDefault from 'public/assets/icon24/checkbox_default_24.svg';

interface TermsCheckBoxProps extends HTMLAttributes<HTMLButtonElement> {
  isCheckAllRequiredTerms: boolean;
}

export default function TermsCheckBoxButton({
  isCheckAllRequiredTerms,
  onClick,
}: TermsCheckBoxProps) {
  return (
    <button
      className="flex gap-[4px] items-center w-full h-[56px] bg-gray-100 p-[16px] rounded-[32px]"
      onClick={onClick}
    >
      {isCheckAllRequiredTerms ? <CheckBoxFill /> : <CheckboxDefault />}
      <p className="text-gray-900 body-16-bold">약관 전체 동의</p>
    </button>
  );
}
