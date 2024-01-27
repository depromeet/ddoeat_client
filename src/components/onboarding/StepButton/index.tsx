'use client';

import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

import Button from '@components/common/Button';

import RightArrowIcon from '/public/assets/icon20/right_arrow_20.svg';

import { defaultFadeInUpVariants } from '@constants/motions';

interface StepButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  step: number;
}

export default function StepButton({ step, ...restProps }: StepButtonProps) {
  if (step === 3)
    return (
      <motion.div
        variants={defaultFadeInUpVariants}
        initial="initial"
        animate="animate"
        key={step}
      >
        <Button
          className="bg-primary-500 active:bg-primary-500 px-[24px] body-16-bold"
          {...restProps}
        >
          또잇또잇 시작하기
        </Button>
      </motion.div>
    );
  return (
    <motion.div
      variants={defaultFadeInUpVariants}
      initial="initial"
      animate="animate"
      key={step}
    >
      <Button
        className="bg-gray-100 active:bg-gray-100 pl-[24px] pr-[12px] body-16-bold gap-[4px] text-gray-700"
        {...restProps}
      >
        다음 <RightArrowIcon />
      </Button>
    </motion.div>
  );
}
