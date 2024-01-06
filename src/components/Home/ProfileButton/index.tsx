'use client';

import { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import CTAButton from '@components/common/CTAButton';
import ProfileIcon from 'public/assets/icon24/profile_default_24.svg';

export default function ProfileButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { push } = useRouter();
  const handleClickProfileButton = () => {
    push('/mypage');
  };
  return (
    <CTAButton
      {...props}
      onClick={handleClickProfileButton}
      className="w-[50px] h-[50px] rounded-[16px] p-0 bg-white shadow-[0_4px_15.4px_0_rgba(0,0,0,0.25)] active:bg-white"
    >
      <ProfileIcon />
    </CTAButton>
  );
}
