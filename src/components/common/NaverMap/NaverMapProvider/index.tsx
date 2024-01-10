'use client';

import { NavermapsProvider } from 'react-naver-maps';
import { PropsWithChildren } from 'react';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

export default function NaverMapProvider({ children }: PropsWithChildren) {
  return (
    <NavermapsProvider ncpClientId={NAVER_CLIENT_ID}>
      {children}
    </NavermapsProvider>
  );
}
