import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'], display: 'swap' });

const SEO_KEYWORDS = [
  // Name variations
  'Ahmmed MD Nayeem',
  'Nayeem Ahmmed',
  'MD Nayeem Ahmmed',
  'Ahmed MD Nayeem',
  'Nayeem',
  'ahmmednayeem',
  // Freelancer / professional
  'freelancer Nayeem',
  'top rated freelancer Nayeem',
  'top 1% freelancer Upwork',
  'top 1% freelancer Fiverr',
  'professional freelancer in Bangladesh',
  'freelancer from Bangladesh',
  'Bangladeshi freelancer',
  // Tech
  'Python developer Nayeem',
  'full-stack developer Nayeem',
  'Web3 developer Nayeem',
  'blockchain developer Nayeem',
  'crypto Nayeem Ahmmed',
  'BTC Nayeem',
  'Bitcoin developer Bangladesh',
  'cyber security Nayeem',
  'ethical hacking Nayeem',
  'cybersecurity Bangladesh',
  'CS engineer Nayeem',
  'computer science Bangladesh',
  // Business
  'businessman Nayeem',
  'investor Nayeem Ahmmed',
  'entrepreneur Bangladesh',
  // The aspirational tags the user requested — kept in keywords only
  'billionaire Nayeem',
  'billionaire Ahmmed MD Nayeem',
  'billionaire Nayeem Ahmmed',
  // Generic
  'portfolio',
  'developer portfolio',
  'hire developer Bangladesh',
];

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020408' },
    { media: '(prefers-color-scheme: light)', color: '#020408' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_CONFIG.name} — Software Engineer · Python · Full-Stack · Top 1% Freelancer`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_CONFIG.name, url: siteUrl }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  applicationName: `${SITE_CONFIG.name} — Portfolio`,
  generator: 'Next.js',
  category: 'Technology',
  classification: 'Personal Portfolio',
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Software Engineer · Python · Full-Stack · Web3 · Top 1% Freelancer`,
    description: SITE_CONFIG.description,
    firstName: 'Ahmmed MD',
    lastName: 'Nayeem',
    username: 'ahmmednayeem',
    gender: 'male',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Software Engineer Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — Software Engineer · Top 1% Freelancer`,
    description: SITE_CONFIG.description,
    creator: '@ahmmednayeem',
    site: '@ahmmednayeem',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these later from Google Search Console / Bing Webmaster
    // google: 'your-google-verification-code',
    // other: { 'msvalidate.01': 'your-bing-code' }
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <JsonLd />
      </head>
      <body className="noise bg-bg-primary text-text-primary">{children}</body>
    </html>
  );
}
