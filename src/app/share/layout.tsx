'use client';

import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import Header from '@components/common/Header';
import useGetSharingSpot from '@hooks/api/useGetSharingSpot';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  if (!segment) throw new Error('no segment');

  const { data: PinList } = useGetSharingSpot({ userId: segment });

  const handleClickBackButton = () => {
    router.push('/');
  };

  return (
    <div>
      <Header onClick={handleClickBackButton} className="z-header bg-white">
        <p className="body-16-bold">{`${PinList?.userNickName}의 맛집 지도`}</p>
      </Header>
      {children}
    </div>
  );
}
