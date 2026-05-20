import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url;
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/#about`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#skills`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#projects`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/#experience`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/#certifications`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#languages`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#contact`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
  ];
}
