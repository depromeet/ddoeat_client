'use client';

import { useRouter } from 'next/navigation';

import CTAButton from '@components/common/CTAButton';
import DdoeatLogo from 'public/assets/ddoeat_logo.svg';
import AppleLogo from 'public/assets/icon24/apple_logo_24.svg';
import KakaoLogo from 'public/assets/icon24/kakao_logo_24.svg';

export default function Page() {
  const { push } = useRouter();

  const handleClickKakaoLoginButton = () => {
    // TODO: 추후에 env=development, env=production으로 변경 요청
    const env = process.env.NODE_ENV === 'development' ? 'local' : 'dev';
    push(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao?env=${env}`,
    );
  };

  const handleClickAppleLoginButton = async () => {
    try {
      const res = await window.AppleID?.auth.signIn();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute right-0 left-0 top-0 bottom-0">
      <div className="flex flex-col gap-[70px] justify-center items-center w-full h-full">
        <DdoeatLogo />
        <div className="flex flex-col gap-[16px] w-full px-[24px] py-[16px]">
          <CTAButton
            className="body-16-bold bg-system-kakaoYellow text-gray-900"
            onClick={handleClickKakaoLoginButton}
          >
            <KakaoLogo />
            카카오로 시작하기
          </CTAButton>
          <CTAButton
            className="body-16-bold border-gray-900 border-[1px] bg-white text-gray-900"
            onClick={handleClickAppleLoginButton}
          >
            <AppleLogo />
            Apple로 시작하기
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
