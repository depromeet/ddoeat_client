import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get('accessToken');
  const refreshToken = request.nextUrl.searchParams.get('refreshToken');
  const isFirstLogin = request.nextUrl.searchParams.get('isFirst') as string;
  const isFromApp = request.nextUrl.searchParams.get('fromApp');

  const url = request.nextUrl.clone();

  // NOTE: 메인 페이지 진입 시 토큰이 존재하지 않으면 로그인 페이지로 리다이렉트
  if (request.nextUrl.pathname === '/') {
    if (request.method === 'POST') {
      return NextResponse.redirect(new URL('/', request.url), 303);
    }

    const cookieAccessToken = request.cookies.get('accessToken');
    const cookieRefreshToken = request.cookies.get('refreshToken');

    if (!cookieAccessToken && !cookieRefreshToken) {
      url.pathname = '/login';
      const response = NextResponse.redirect(url);

      return response;
    }
  }

  // NOTE: splash 화면으로 넘어왔을 때 쿠키 내의 토큰 여부에 따른 리다이렉트 로직
  if (request.nextUrl.pathname === '/auth') {
    if (isFromApp === 'true') {
      if (accessToken && refreshToken) {
        url.pathname = '/';
      } else {
        url.pathname = '/login';
      }
    } else {
      // 웹
      if (isFirstLogin === 'True') {
        url.pathname = '/terms';
      } else {
        url.pathname = '/';
      }
    }

    url.search = '';

    const response = NextResponse.redirect(url);

    if (accessToken && refreshToken) {
      response.cookies.set('accessToken', accessToken, { path: '/' });
      response.cookies.set('refreshToken', refreshToken, { path: '/' });
    }

    return response;
  }
}

export const config = {
  matcher: ['/auth', '/'],
};
