'use client';

import { useState } from 'react';

import { usePostSignUp } from '@hooks/api/usePostSignUp';
import { TERMS } from '@constants/terms';
import AllTermsCheckBox from '@components/terms/AllTermsCheckBox';
import FixedBottomCTAButton from '@components/common/FixedBottomCTAButton';
import TermsItem from '@components/terms/TermsItem';

export default function Page() {
  const { mutate: postSignUp } = usePostSignUp();

  const [termsState, setTermsState] = useState(
    TERMS.map((term) => ({ ...term, isChecked: false })),
  );

  // NOTE: 모든 약관이 클릭 되었는가, 필수 약관이 클릭 되었는가
  const isTermsAllChecked = termsState.every((term) => term.isChecked);
  const isRequiredTermsAllChecked = termsState.every(
    (term) => !term.required || term.isChecked,
  );

  // NOTE: 전체 약관 클릭 여부 변경 함수
  const handleCheckAll = () => {
    setTermsState((prevTerm) =>
      prevTerm.map((term) => ({ ...term, isChecked: !isTermsAllChecked })),
    );
  };

  // NOTE: 개별 약관 클릭 여부 변경 함수
  const handleClickTermsItem = (id: string) => () => {
    setTermsState((prevTerm) =>
      prevTerm.map((term) =>
        term.id === id ? { ...term, isChecked: !term.isChecked } : term,
      ),
    );
  };

  const handleClickConfirmButton = () => {
    postSignUp();
  };

  return (
    <div className="w-full h-full pt-[56px]">
      <h1 className="header-22 text-gray-900 px-[16px] py-[16px]">
        또잇또잇이 처음이시군요! <br />
        <strong className="text-primary-500">약관 내용</strong>에 동의해주세요
      </h1>
      <div className="px-[16px] py-[12px]">
        <AllTermsCheckBox
          checked={isTermsAllChecked}
          onChange={handleCheckAll}
        />
      </div>
      <ul className="pb-[112px]">
        {TERMS.map((term, index) => (
          <TermsItem
            key={term.id}
            title={term.title}
            termsType={term.termsType}
            checked={termsState[index].isChecked}
            onChange={handleClickTermsItem(term.id)}
          />
        ))}
      </ul>
      <FixedBottomCTAButton
        className="bg-white"
        disabled={!isRequiredTermsAllChecked}
        onClick={handleClickConfirmButton}
      >
        확인
      </FixedBottomCTAButton>
    </div>
  );
}
