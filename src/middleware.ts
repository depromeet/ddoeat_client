import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const isFromApp = request.nextUrl.searchParams.get('fromApp');

  const url = request.nextUrl.clone();

  // NOTE: 메인 페이지 진입 시 토큰이 존재하지 않으면 로그인 페이지로 리다이렉트
  if (request.nextUrl.pathname === '/') {
    const cookieAccessToken = request.cookies.get('accessToken');
    const cookieRefreshToken = request.cookies.get('refreshToken');

    if (!cookieAccessToken && !cookieRefreshToken) {
      url.pathname = '/login';
      const response = NextResponse.redirect(url);

      return response;
    }
  }

  // NOTE: 앱으로부터 넘어온 케이스
  if (request.nextUrl.pathname === '/auth' && isFromApp === 'true') {
    const accessToken = request.nextUrl.searchParams.get('accessToken');
    const refreshToken = request.nextUrl.searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      url.pathname = '/';
    } else {
      url.pathname = '/login';
    }

    url.search = '';
    const response = NextResponse.redirect(url);
    if (accessToken && refreshToken) {
      response.cookies.set('accessToken', accessToken, { path: '/' });
      response.cookies.set('refreshToken', refreshToken, { path: '/' });
    }
    return response;
  }

  const provider = request.nextUrl.searchParams.get('type');
  // NOTE: 카카오 로그인 > 로그인 api 호출 > 토큰 저장 후 메인페이지 이동
  if (request.nextUrl.pathname === '/auth' && provider === 'kakao') {
    const code = request.nextUrl.searchParams.get('code') as string;
    const redirect_uri =
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/auth?type=${provider}`
        : `${process.env.NEXT_PUBLIC_LOCAL_DOMAIN}/auth?type=${provider}`;

    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        code,
        redirect_uri,
      }),
    });

    const responseData = await res.json();

    // NOTE: 토큰 발급 성공 시 쿠키에 저장 후 메인 페이지로 이동
    if (res.status === 200) {
      const {
        data: { accessToken, refreshToken, isFirst },
      } = responseData;

      if (isFirst) {
        url.pathname = '/terms';
      } else {
        url.pathname = '/';
      }

      url.search = '';
      const response =
        request.method === 'POST'
          ? NextResponse.redirect(url, 303)
          : NextResponse.redirect(url);
      if (accessToken && refreshToken) {
        response.cookies.set('accessToken', accessToken, { path: '/' });
        response.cookies.set('refreshToken', refreshToken, { path: '/' });
      }
      return response;
    } else {
      // NOTE: 토큰 발급 실패 시 로그인 페이지로 이동
      url.pathname = '/login';
      url.search = '';
      return request.method === 'POST'
        ? NextResponse.redirect(url, 303)
        : NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/', '/auth'],
};
