'use client';

import { useState } from 'react';

import TermsCheckBox from '@components/terms/TermsCheckBox';
import NavigationButton from '@components/terms/NavigationButton';

export default function Page() {
  const [isCheckAllRequiredTerms, setIsCheckAllRequiredTerms] = useState(false);

  const handleClickCheckButton = () => {
    setIsCheckAllRequiredTerms((prev) => !prev);
  };

  const handleClickConfirmButton = () => {
    // TODO: 확인 버튼 클릭 로직 작성
  };

  return (
    <div className="w-full h-full px-[16px]">
      <h1 className="header-22 text-gray-900 py-[16px]">
        또잇또잇이 처음이시군요! <br />
        <strong className="text-primary-500">약관 내용</strong>에 동의해주세요
      </h1>
      <div className="py-[12px]">
        <TermsCheckBox
          isCheckAllRequiredTerms={isCheckAllRequiredTerms}
          onClick={handleClickCheckButton}
        />
      </div>
      <NavigationButton
        disabled={!isCheckAllRequiredTerms}
        className="absolute bottom-0 left-0"
        onClick={handleClickConfirmButton}
      >
        확인
      </NavigationButton>
    </div>
  );
}
