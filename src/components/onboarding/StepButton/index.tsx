'use client';

import { ButtonHTMLAttributes } from 'react';

import Button from '@components/common/Button';

import RightArrowIcon from '/public/assets/icon20/right_arrow_20.svg';

interface StepButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  step: number;
}

export default function StepButton({ step, ...restProps }: StepButtonProps) {
  if (step === 3)
    return (
      <Button
        className="bg-primary-500 active:bg-primary-500 px-[24px] body-16-bold"
        {...restProps}
      >
        또잇또잇 시작하기
      </Button>
    );
  return (
    <Button
      className="bg-gray-100 active:bg-gray-100 pl-[24px] pr-[12px] body-16-bold gap-[4px] text-gray-700"
      {...restProps}
    >
      다음 <RightArrowIcon />
    </Button>
  );
}
