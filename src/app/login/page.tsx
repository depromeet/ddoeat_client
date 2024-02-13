'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import CTAButton from '@components/common/CTAButton';
import DdoeatLogo from 'public/assets/ddoeat_logo.svg';
import AppleLogo from 'public/assets/icon24/apple_logo_24.svg';
import KakaoLogo from 'public/assets/icon24/kakao_logo_24.svg';
import type { AppleSigninResponse } from 'src/types/apple';

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/auth?type=kakao`
    : `${process.env.NEXT_PUBLIC_LOCAL_DOMAIN}/auth?type=kakao`;

const APPLE_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/login`
    : `${process.env.NEXT_PUBLIC_LOCAL_DOMAIN}/login`;

export default function Page() {
  const { push } = useRouter();
  useEffect(() => {
    const handleAppleLoginSuccess = async (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent<AppleSigninResponse>;
      console.log(customEvent.detail);
      const code = customEvent.detail.authorization.id_token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: 'apple',
            code,
            redirect_uri: APPLE_REDIRECT_URI,
          }),
        },
      );

      const responseData = await res.json();

      if (res.status === 200) {
        const {
          data: { accessToken, refreshToken, isFirst },
        } = responseData;

        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);

        if (isFirst) {
          push('/terms');
        } else {
          push('/');
        }
      }
    };

    const handleAppleLoginFail = (e: unknown) => {
      console.error(e);
    };

    document.addEventListener(
      'AppleIDSignInOnSuccess',
      handleAppleLoginSuccess,
    );
    document.addEventListener('AppleIDSignInOnFailure', handleAppleLoginFail);

    return () => {
      document.removeEventListener(
        'AppleIDSignInOnSuccess',
        handleAppleLoginSuccess,
      );
      document.removeEventListener(
        'AppleIDSignInOnFailure',
        handleAppleLoginFail,
      );
    };
  }, []);

  const handleClickKakaoLoginButton = () => {
    push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`,
    );
  };

  const handleClickAppleLoginButton = async () => {
    try {
      await window.AppleID?.auth.signIn();
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
