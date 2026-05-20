/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

// Tightened in production. Permissive in dev so HMR / inline scripts work.
const CSP = isProd
  ? [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // Next.js inlines bootstrap scripts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')
  : null;

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  ...(CSP ? [{ key: 'Content-Security-Policy', value: CSP }] : []),
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
    ];
  },
};

export default nextConfig;
