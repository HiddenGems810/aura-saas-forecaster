import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = { themeColor: '#d4af37' };

export const metadata: Metadata = {
  metadataBase: new URL('https://aurarevenue.com'),
  title: 'AURA | Interactive SaaS Wealth Forecaster',
  description:
    'Project your SaaS MRR growth, model churn, and visualize your 60-month wealth trajectory. Free instant calculator — no sign-up required.',
  alternates: {
    canonical: 'https://aurarevenue.com',
  },
  manifest: '/manifest.webmanifest',
  keywords: ['SaaS MRR calculator', 'MRR growth forecast', 'churn rate calculator', 'SaaS revenue projector', 'MRR wealth tool', 'SaaS financial model'],
  openGraph: {
    title: 'AURA | Interactive SaaS Wealth Forecaster',
    description:
      'Model your MRR compounding, churn impact, and 60-month wealth trajectory. Export a full PDF report instantly.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'AURA — Interactive SaaS Wealth Forecaster' }],
    url: 'https://aurarevenue.com',
    type: 'website',
    siteName: 'AURA Revenue Forecaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA | Interactive SaaS Wealth Forecaster',
    description: 'Model MRR compounding, churn impact, and your 60-month wealth trajectory. Free PDF export.',
    images: ['/opengraph-image.png'],
  },
  icons: { icon: '/icon.png', apple: '/icon.png' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  other: {
    'google-adsense-account': 'ca-pub-9712970521775555',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AURA SaaS Wealth Forecaster',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Interactive MRR and wealth forecasting tool for SaaS founders. Model growth, churn, and visualize your 60-month trajectory. Export a full PDF report instantly — no sign-up required.',
    url: 'https://aurarevenue.com',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'AURA Revenue Forecaster',
      url: 'https://aurarevenue.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '128',
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9712970521775555"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
