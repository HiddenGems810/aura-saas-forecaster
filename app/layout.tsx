import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1114',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aura Revenue | SaaS MRR Forecasting Calculator',
    template: '%s | Aura Revenue',
  },
  description:
    'Forecast SaaS MRR, churn, ARR, and long-term recurring revenue with Aura Revenue educational SaaS growth tools and explainers.',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  keywords: [
    'SaaS MRR calculator',
    'MRR forecast',
    'SaaS revenue forecast',
    'churn calculator',
    'ARR calculator',
    'net revenue retention',
  ],
  openGraph: {
    title: 'Aura Revenue | SaaS MRR Forecasting Calculator',
    description:
      'Forecast SaaS MRR, churn, ARR, and long-term recurring revenue with educational SaaS finance resources.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Revenue | SaaS MRR Forecasting Calculator',
    description: 'Educational SaaS MRR forecasting calculator and recurring revenue resources.',
    images: ['/opengraph-image.png'],
  },
  icons: { icon: '/icon.png', shortcut: '/favicon.png', apple: '/icon.png' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  other: {
    'google-adsense-account': 'ca-pub-9712970521775555',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Educational SaaS revenue forecasting calculator and recurring revenue resource library.',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9712970521775555"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
