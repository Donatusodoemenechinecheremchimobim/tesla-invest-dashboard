import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  // 1. Supabase cookies usually start with 'sb-' followed by your project ref
  const allCookies = request.cookies.getAll();
  const hasSupabaseSession = allCookies.some(c => c.name.includes('auth-token'));
  
  const { pathname } = request.nextUrl;

  // 2. Protect Dashboard: If NO session, go to /auth
  if (pathname.startsWith('/dashboard') && !hasSupabaseSession) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // 3. Prevent Double Login: If HAS session, go to /dashboard
  if (pathname.startsWith('/auth') && hasSupabaseSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
};
