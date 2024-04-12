'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import Header from '@components/common/Header';
import { useGetUserProfile } from '@hooks/api/useGetUserProfile';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleClickBackButton = () => {
    router.back();
  };

  const { data: userProfile } = useGetUserProfile();

  return (
    <main className="w-full max-w-[480px] h-[100dvh]">
      <Header
        onClick={handleClickBackButton}
        className="body-14-bold text-black text-center"
      >
        {userProfile?.nickname}
      </Header>
      {children}
    </main>
  );
}
