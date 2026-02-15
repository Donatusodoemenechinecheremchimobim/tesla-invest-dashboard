import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Supabase stores the session in a cookie starting with 'sb-'
  // We check for any cookie that contains the 'auth-token'
  const allCookies = request.cookies.getAll();
  const supabaseSession = allCookies.find(cookie => cookie.name.includes('auth-token'));
  
  const { pathname } = request.nextUrl;

  // 2. Protect the Dashboard
  // If no Supabase cookie exists, send them to /auth
  if (pathname.startsWith('/dashboard') && !supabaseSession) {
    // Change '/portal/auth' to just '/auth' if that is your path
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // 3. Prevent logged-in users from seeing the login page
  if (pathname.startsWith('/auth') && supabaseSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
};
