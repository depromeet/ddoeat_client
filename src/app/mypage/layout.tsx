'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Header from '@components/common/Header';
import { useGetUserProfile } from '@hooks/api/useGetUserProfile';
import SettingIcon from 'public/assets/icon24/setting_24.svg';
import ShareIcon from 'public/assets/icon24/share_24.svg';
import copyToClipboard from '@utils/copyToClipboard';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { data: userProfile } = useGetUserProfile();

  const handleClickBackButton = () => {
    router.push('/');
  };

  const handleClickSettingButton = () => router.push('/settings');

  const copyShareAddress = () => {
    copyToClipboard({
      text: `https://ddoeat.site/share/${userProfile?.userId}`,
      onCopySuccess: () => toast('내 맛집 지도 링크를 클립보드에 복사했어요!'),
    });
  };

  const handleClickShareButton = () => {
    if (!navigator.share) {
      copyShareAddress();
      return;
    }

    try {
      navigator.share({
        title: `${userProfile?.nickname}의 맛집지도`,
        text: `${userProfile?.nickname}의 맛집지도`,
        url: `https://ddoeat.site/share/${userProfile?.userId}`,
      });
    } catch (error) {
      copyShareAddress();
    }
  };

  return (
    <main className='bg-[url("/assets/image/mypage/background.png")] bg-cover w-full max-w-[480px] h-[100dvh]'>
      <Header
        onClick={handleClickBackButton}
        className=" [&>*>*>*]:fill-white justify-between relative"
      >
        <div className="flex justify-center items-center gap-[8px]">
          <ShareIcon onClick={handleClickShareButton} />
          <SettingIcon onClick={handleClickSettingButton} />
        </div>
      </Header>
      {children}
    </main>
  );
}
