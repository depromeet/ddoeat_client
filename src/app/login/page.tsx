'use client';

import CTAButton from '@components/common/CTAButton';
import DdoeatLogo from 'public/assets/ddoeat_logo.svg';
import AppleLogo from 'public/assets/icon24/apple_logo_24.svg';
import KakaoLogo from 'public/assets/icon24/kakao_logo_24.svg';

export default function page() {
  const handleClickKakaoLoginButton = () => {
    // TODO: 카카오 로그인 구현
  };

  const handleClickAppleLoginButton = () => {
    // TODO: 애플 로그인 구현
  };

  return (
    <div className="absolute right-0 left-0 top-0 bottom-0">
      <div className="flex flex-col gap-[70px] justify-center items-center w-full h-full">
        <DdoeatLogo />
        <div className="flex flex-col gap-[16px] w-full px-[24px] py-[16px]">
          <CTAButton
            // NOTE: body-16-bold 스타일 미적용 확인
            className="body-16-bold bg-system-kakaoYellow text-gray-900"
            onClick={handleClickKakaoLoginButton}
          >
            <KakaoLogo />
            카카오로 시작하기
          </CTAButton>
          <CTAButton
            // NOTE: body-16-bold 스타일 미적용 확인
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
