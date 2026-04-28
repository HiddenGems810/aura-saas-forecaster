import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { SaasCalculator } from '@/components/site/saas-calculator';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SaaS MRR Forecasting Calculator',
  description: 'Forecast SaaS MRR, churn, ARR, and cumulative recurring revenue using clear educational assumptions.',
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: 'SaaS MRR Forecasting Calculator | Aura Revenue',
    description: 'Model SaaS MRR growth, churn impact, ARR run rate, and cumulative forecast revenue.',
    url: '/calculator',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function CalculatorPage() {
  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SaaS MRR Forecasting Calculator',
        url: `${SITE_URL}/calculator`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: metadata.description,
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Calculator', item: `${SITE_URL}/calculator` },
        ],
      },
      {
        '@type': 'WebPage',
        name: 'SaaS MRR Forecasting Calculator',
        url: `${SITE_URL}/calculator`,
        description: metadata.description,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      },
    ],
  };

  const howToSteps = [
    ['1', 'Enter your current MRR.', 'Start with your current monthly recurring revenue from active subscriptions.'],
    ['2', 'Choose your monthly growth and churn assumptions.', 'Growth adds new recurring revenue. Churn removes recurring revenue.'],
    ['3', 'Review ending MRR, ARR run rate, and cumulative forecast revenue.', 'Use the results to compare scenarios, not as financial advice.'],
  ];

  const relatedGuides = [
    ['What is MRR?', '/learn/what-is-mrr'],
    ['Churn Rate', '/learn/churn-rate'],
    ['GRR vs NRR', '/learn/gross-revenue-retention-vs-net-revenue-retention'],
    ['CAC Payback', '/learn/saas-cac-payback'],
    ['Forecasting Methodology', '/methodology'],
  ];

  const faqs = [
    ['What is MRR?', 'MRR means monthly recurring revenue. It is the predictable subscription revenue a SaaS business expects from active recurring plans in a month.'],
    ['How is ARR run rate calculated?', 'ARR run rate is calculated by multiplying ending MRR by 12. It annualizes the current recurring revenue base, but it does not guarantee future collections.'],
    ['Why does churn matter in a forecast?', 'Churn reduces the recurring revenue base that future growth compounds from. Even small churn changes can materially change long-range SaaS forecasts.'],
    ['Is this a financial projection?', 'No. Aura Revenue provides educational scenario estimates based on your inputs. It is not financial, tax, accounting, legal, or investment advice.'],
    ['How accurate is a SaaS MRR forecast?', 'A forecast is only as useful as its assumptions. Growth, churn, pricing, expansion, payment failures, and customer behavior can all change actual results.'],
  ];

  return (
    <PageShell>
      <JsonLd data={calculatorSchema} />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">SaaS MRR Forecasting Calculator</h1>
        <p className="mb-8 mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Use this SaaS MRR forecasting calculator to estimate future monthly recurring revenue, ARR run rate, churn impact, and cumulative forecast revenue based on your current MRR, growth rate, churn rate, and forecast period. The model is educational and uses simplified assumptions, so results should be treated as planning estimates rather than financial advice.
        </p>
        <section className="mb-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-2xl font-semibold text-white">How to use this calculator</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {howToSteps.map(([step, title, body]) => (
              <div key={title} className="rounded-md border border-white/10 bg-slate-950/35 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-300 text-sm font-bold text-slate-950">{step}</span>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <SaasCalculator />
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-white">Related SaaS forecasting guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {relatedGuides.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-200 hover:border-teal-300/40 hover:bg-white/[0.07]">
                {label}
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-10 max-w-4xl">
          <h2 className="text-2xl font-semibold text-white">Calculator FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer font-semibold text-white">{question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
