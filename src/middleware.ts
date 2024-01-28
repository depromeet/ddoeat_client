import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // NOTE: splash 화면으로 넘어왔을 때 쿠키 내의 토큰 여부에 따른 리다이렉트 로직
  const isFromApp = request.nextUrl.searchParams.get('fromApp');

  if (isFromApp === 'true') {
    const accessToken = request.cookies.get('accessToken');
    const refreshToken = request.cookies.get('refreshToken');

    const url = request.nextUrl.clone();

    if (accessToken && refreshToken) {
      url.pathname = '/';
    } else {
      url.pathname = '/login';
    }

    const response = NextResponse.redirect(url);

    return response;
  }

  const accessToken = request.nextUrl.searchParams.get('accessToken');
  const refreshToken = request.nextUrl.searchParams.get('refreshToken');
  const isFirstLogin = request.nextUrl.searchParams.get('isFirst') as string;

  const url = request.nextUrl.clone();

  if (isFirstLogin === 'true') {
    url.pathname = '/terms';
  } else {
    url.pathname = '/';
  }

  url.search = '';

  const response = NextResponse.redirect(url);
  if (accessToken && refreshToken) {
    response.cookies.set('accessToken', accessToken, { path: '/' });
    response.cookies.set('refreshToken', refreshToken, { path: '/' });
  }

  return response;
}

export const config = {
  matcher: '/auth',
};
