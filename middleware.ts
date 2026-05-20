import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/local';

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const localToken = request.cookies.get(SESSION_COOKIE)?.value;
    const localSession = await verifySessionToken(localToken);

    if (!user && !localSession) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
