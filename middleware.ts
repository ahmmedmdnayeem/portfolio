import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/local';

export async function middleware(request: NextRequest) {
  let response: ReturnType<typeof NextResponse.next>;
  let supabaseUser: { id?: string } | null = null;

  try {
    const session = await updateSession(request);
    response = session.response;
    supabaseUser = session.user;
  } catch {
    // If Supabase auth check itself fails (network, bad creds), don't 500.
    response = NextResponse.next({ request: { headers: request.headers } });
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    let localSession: { email: string } | null = null;
    try {
      const token = request.cookies.get(SESSION_COOKIE)?.value;
      localSession = await verifySessionToken(token);
    } catch {
      localSession = null;
    }

    if (!supabaseUser && !localSession) {
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
