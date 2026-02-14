import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('portal_session');
  const { pathname } = request.nextUrl;

  // 1. If user is trying to access dashboard WITHOUT a session, send to /portal/auth
  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/portal/auth', request.url));
  }

  // 2. If user is logged in and tries to go to /portal/auth, send to /dashboard
  if (pathname.startsWith('/portal/auth') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/portal/auth'],
};
