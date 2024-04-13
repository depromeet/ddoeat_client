'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import Header from '@components/common/Header';
import { useGetUserProfile } from '@hooks/api/useGetUserProfile';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleClickBackButton = () => {
    router.back();
  };

  const pathname = usePathname();
  const userId = Number(pathname.split('/').pop());

  const { data: userProfile } = useGetUserProfile(Number(userId));

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
