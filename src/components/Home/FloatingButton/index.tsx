'use client';

import { ButtonHTMLAttributes } from 'react';

import CTAButton from '@components/common/CTAButton';
import InActiveLocation from 'public/assets/icon24/loction_default_24.svg';
import ActiveLocation from 'public/assets/icon24/location_filled_24.svg';

// NOTE: isActive는 예시입니다
interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function FloatingButton({
  isActive,
  ...props
}: FloatingButtonProps) {
  return (
    <CTAButton
      {...props}
      className="w-[50px] h-[50px] rounded-[16px] p-0 bg-white shadow-[0_4px_15.4px_0_rgba(0,0,0,0.25)] active:bg-white"
    >
      {isActive ? <ActiveLocation /> : <InActiveLocation />}
    </CTAButton>
  );
}
