import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from './local';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

/**
 * Returns true if the caller is an authenticated admin.
 *
 * Auth precedence:
 *   1. Supabase Auth session (preferred when configured).
 *   2. Local HMAC-signed cookie session — ONLY honored when:
 *        - Supabase is NOT configured (offline-dev mode), or
 *        - ALLOW_LOCAL_AUTH=true is explicitly set (emergency override).
 *
 * The optional admin-email allowlist (ADMIN_ALLOWED_EMAILS, comma separated)
 * further restricts which Supabase users count as admin. If unset, any
 * authenticated Supabase user passes — combine this with disabling public
 * signups in the Supabase dashboard.
 */
export async function isAdmin(): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const allowed = (process.env.ADMIN_ALLOWED_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
          .split(',')
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);
        if (allowed.length === 0) return true;
        return allowed.includes(user.email?.toLowerCase() ?? '');
      }
    } catch {}
  }

  const localAllowed = !isSupabaseConfigured() || process.env.ALLOW_LOCAL_AUTH === 'true';
  if (localAllowed) {
    const token = cookies().get(SESSION_COOKIE)?.value;
    const local = await verifySessionToken(token);
    if (local) return true;
  }
  return false;
}
