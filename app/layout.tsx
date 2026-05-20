import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants/navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Python Developer · Full-Stack · Top 1% Upwork`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'python developer',
    'full-stack developer',
    'blockchain fundamentals',
    'upwork top rated',
    'marketing to engineering',
    'internship',
    'entry-level developer',
    'trilingual developer',
    'Ahmmed MD Nayeem',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: 'website',
    title: `${SITE_CONFIG.name} — Python Developer · Full-Stack · Top 1% Upwork`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: '@ahmmednayeem',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${syne.variable}`}>
      <body className="noise bg-bg-primary text-text-primary">{children}</body>
    </html>
  );
}