import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants/navigation';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url;
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/login'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
