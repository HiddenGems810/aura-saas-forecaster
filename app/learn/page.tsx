import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { learnArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Learn SaaS MRR, ARR, Churn, and Forecasting',
  description: 'Educational guides for SaaS founders about MRR, ARR, churn, net revenue retention, benchmarks, and revenue forecasting.',
  alternates: { canonical: '/learn' },
  openGraph: {
    title: 'Learn SaaS MRR, ARR, Churn, and Forecasting | Aura Revenue',
    description: 'Educational guides for SaaS founders about MRR, ARR, churn, net revenue retention, benchmarks, and revenue forecasting.',
    url: '/learn',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function LearnPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Learn SaaS Revenue Forecasting</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Original guides for understanding MRR, ARR, churn, net revenue retention, realistic benchmarks, and recurring revenue forecast models.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/learn/saas-kpi-glossary" className="rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-5 transition hover:border-teal-300/40 hover:bg-teal-300/[0.09]">
            <h2 className="text-xl font-semibold text-white">SaaS KPI Glossary</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Plain-English definitions and formulas for MRR, ARR, churn, NRR, GRR, CAC payback, burn multiple, and Rule of 40.</p>
            <span className="mt-4 inline-block text-sm font-semibold text-teal-300">Open glossary</span>
          </Link>
          {learnArticles.map((article) => (
            <Link key={article.slug} href={`/learn/${article.slug}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-teal-300/40 hover:bg-white/[0.07]">
              <h2 className="text-xl font-semibold text-white">{article.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{article.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-teal-300">Read guide</span>
            </Link>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
