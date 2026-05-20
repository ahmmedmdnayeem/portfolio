import { NextResponse } from 'next/server';
import { checkCredentials, createSessionToken, COOKIE_OPTIONS, SESSION_COOKIE } from '@/lib/auth/local';
import { isSupabaseConfigured } from '@/lib/supabase/server';

const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return true;
  arr.push(now);
  recent.set(ip, arr);
  return false;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a minute.' }, { status: 429 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  // Security: when Supabase is configured, refuse local fallback entirely.
  // This collapses the attack surface to Supabase Auth only — no plaintext
  // env-stored password is honored once a real auth provider is wired up.
  // Override with ALLOW_LOCAL_AUTH=true if you genuinely want both paths
  // (e.g. offline emergency access).
  if (isSupabaseConfigured() && process.env.ALLOW_LOCAL_AUTH !== 'true') {
    return NextResponse.json(
      { error: 'Local auth is disabled. Use Supabase login.' },
      { status: 401 },
    );
  }

  if (!(await checkCredentials(email, password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createSessionToken(email);
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, COOKIE_OPTIONS);
  return res;
}
