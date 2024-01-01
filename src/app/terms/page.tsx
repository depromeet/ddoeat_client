'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import TermsCheckBoxButton from '@components/terms/TermsCheckBoxButton';
import NavigationButton from '@components/terms/NavigationButton';
import TermsItem from '@components/terms/TermsItem';

type TermsItem = 'terms1' | 'terms2' | 'terms3';

export default function Page() {
  const { push } = useRouter();

  const [termsChecked, setTermsChecked] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });

  // NOTE: 전체 약관 클릭 여부 변경 함수
  const handleClickTermsCheckBoxButton = () => {
    if (termsChecked.terms1 && termsChecked.terms2 && termsChecked.terms3) {
      setTermsChecked({
        terms1: false,
        terms2: false,
        terms3: false,
      });
    } else {
      setTermsChecked({
        terms1: true,
        terms2: true,
        terms3: true,
      });
    }
  };

  // NOTE: 개별 약관 클릭 여부 변경 함수
  const handleClickTermsItem = (termItem: TermsItem) => {
    setTermsChecked((prev) => ({
      ...prev,
      [termItem]: !prev[termItem],
    }));
  };

  const handleClickConfirmButton = () => {
    push('/');
  };

  return (
    <div className="w-full h-full">
      <h1 className="header-22 text-gray-900 px-[16px] py-[16px]">
        또잇또잇이 처음이시군요! <br />
        <strong className="text-primary-500">약관 내용</strong>에 동의해주세요
      </h1>
      <div className="px-[16px] py-[12px]">
        <TermsCheckBoxButton
          isCheckAllRequiredTerms={
            termsChecked.terms1 && termsChecked.terms2 && termsChecked.terms3
          }
          onClick={handleClickTermsCheckBoxButton}
        />
      </div>
      <ul>
        <TermsItem
          title="또잇또잇 이용약관 (필수)"
          isChecked={termsChecked.terms1}
          onChangeCheckState={() => handleClickTermsItem('terms1')}
        />
        <TermsItem
          title="위치정보 이용약관 동의 (필수)"
          isChecked={termsChecked.terms2}
          onChangeCheckState={() => handleClickTermsItem('terms2')}
        />
        <TermsItem
          title="제 3자 정보제공 동의"
          isChecked={termsChecked.terms3}
          onChangeCheckState={() => handleClickTermsItem('terms3')}
        />
      </ul>
      <NavigationButton
        disabled={!termsChecked.terms1 || !termsChecked.terms2}
        className="absolute bottom-0 left-0"
        onClick={handleClickConfirmButton}
      >
        확인
      </NavigationButton>
    </div>
  );
}
