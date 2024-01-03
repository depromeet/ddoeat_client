'use client';

import { ButtonHTMLAttributes } from 'react';

import CTAButton from '@components/common/CTAButton';
import InActiveLocationIcon from 'public/assets/icon24/loction_default_24.svg';
import ActiveLocationIcon from 'public/assets/icon24/location_filled_24.svg';

// NOTE: isActive는 예시입니다. 부모 컴포넌트에서 클릭하는 위치가 어딘지에 따라 상태가 달라집니다.
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
      {isActive ? <ActiveLocationIcon /> : <InActiveLocationIcon />}
    </CTAButton>
  );
}
