import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
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
