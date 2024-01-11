'use client';

import { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import ProfileIcon from 'public/assets/icon24/profile_default_24.svg';
import Button from '@components/common/Button';

export default function ProfileButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { push } = useRouter();
  const handleClickProfileButton = () => {
    push('/mypage');
  };
  return (
    <Button
      {...props}
      onClick={handleClickProfileButton}
      className="w-[50px] h-[50px] rounded-[16px] p-0 bg-white shadow-floating active:bg-white flex items-center justify-center"
    >
      <ProfileIcon />
    </Button>
  );
}
