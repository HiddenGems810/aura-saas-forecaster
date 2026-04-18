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
    '@type': 'WebApplication',
    name: 'AURA SaaS Wealth Forecaster',
    applicationCategory: 'BusinessApplication',
    description: 'Interactive MRR and wealth forecasting tool for SaaS founders. Model growth, churn, and export PDF reports.',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: ['MRR Projection', 'Churn Modeling', 'Industry Benchmark', 'PDF Export', 'Shareable URL'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is MRR in SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MRR (Monthly Recurring Revenue) is the total predictable revenue a SaaS business generates each month from active subscriptions. It is the single most important metric for measuring SaaS growth velocity.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate SaaS MRR growth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SaaS MRR growth is calculated using the formula: MRR_n = MRR_(n-1) × (1 + growth rate − churn rate). Each month compounds on the previous, creating exponential growth when growth exceeds churn.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a good churn rate for SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A good monthly churn rate for SaaS is below 2%. Top-quartile SaaS companies maintain churn below 1% monthly. Anything above 5% monthly churn will significantly drag on long-term revenue compounding.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take a SaaS business to reach $1 million in revenue?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most SaaS businesses starting at $5,000–$15,000 MRR with healthy growth rates, reaching $1 million in cumulative revenue typically takes 18–36 months. Use the Aura MRR calculator to model your specific timeline.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this MRR calculator free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Aura is completely free to use with no sign-up required. You can model your MRR growth, churn impact, and export a full PDF report instantly.',
        },
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
