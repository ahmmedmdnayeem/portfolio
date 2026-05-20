// Uses Web Crypto API so this module works in both Edge (middleware) and Node runtimes.

export const SESSION_COOKIE = 'admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) return null;
  return s;
}

async function importHmacKey(): Promise<CryptoKey | null> {
  const s = getSecret();
  if (!s) return null;
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(s),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function base64UrlEncode(s: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(s, 'utf8').toString('base64url');
  }
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(b64: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64url').toString('utf8');
  }
  const pad = '='.repeat((4 - (b64.length % 4)) % 4);
  const s = (b64 + pad).replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(s)));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function createSessionToken(email: string): Promise<string> {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${email}:${expires}`;
  const key = await importHmacKey();
  if (!key) {
    throw new Error('ADMIN_SESSION_SECRET is not configured (set a value of at least 16 chars).');
  }
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return `${base64UrlEncode(payload)}.${bytesToHex(sig)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<{ email: string } | null> {
  if (!token) return null;
  const [b64, sigHex] = token.split('.');
  if (!b64 || !sigHex) return null;

  let payload: string;
  try {
    payload = base64UrlDecode(b64);
  } catch {
    return null;
  }

  const key = await importHmacKey();
  if (!key) return null; // No secret configured → treat as invalid token, never throw
  const expected = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)),
  );
  let provided: Uint8Array;
  try {
    provided = hexToBytes(sigHex);
  } catch {
    return null;
  }

  if (!timingSafeEqual(expected, provided)) return null;

  const [email, expiresStr] = payload.split(':');
  const expires = Number(expiresStr);
  if (!email || !expires || expires < Date.now()) return null;
  return { email };
}

/**
 * Constant-time credential check.
 * Hashes both supplied and expected values to fixed-length digests before
 * comparing, so neither timing nor length reveals anything about the secret.
 * Always performs the full work — never short-circuits on missing env vars.
 */
export async function checkCredentials(email: string, password: string): Promise<boolean> {
  // If local fallback is disabled or unconfigured, still do the hash work so
  // we don't leak whether ADMIN_EMAIL/ADMIN_PASSWORD are set.
  const expectedEmail = process.env.ADMIN_EMAIL ?? '';
  const expectedPassword = process.env.ADMIN_PASSWORD ?? '';
  const enabled = expectedEmail.length > 0 && expectedPassword.length > 0;

  const enc = new TextEncoder();
  const [aEmail, bEmail, aPw, bPw] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(email.toLowerCase())),
    crypto.subtle.digest('SHA-256', enc.encode(expectedEmail.toLowerCase())),
    crypto.subtle.digest('SHA-256', enc.encode(password)),
    crypto.subtle.digest('SHA-256', enc.encode(expectedPassword)),
  ]);

  const emailMatch = timingSafeEqual(new Uint8Array(aEmail), new Uint8Array(bEmail));
  const pwMatch = timingSafeEqual(new Uint8Array(aPw), new Uint8Array(bPw));
  return enabled && emailMatch && pwMatch;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE_SECONDS,
};
