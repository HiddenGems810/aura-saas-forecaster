import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, FileSpreadsheet } from 'lucide-react';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { metricTools } from '@/lib/metric-tools';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free SaaS Finance Calculators',
  description: 'Free SaaS finance calculators for ARR run rate, churn, CAC payback, Rule of 40, net revenue retention, and burn multiple.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free SaaS Finance Calculators | Aura Revenue',
    description: 'Calculate SaaS ARR run rate, churn, CAC payback, Rule of 40, NRR, and burn multiple with educational tools.',
    url: '/tools',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS finance calculator tools' }],
  },
};

export default function ToolsPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Free SaaS Finance Calculators',
          description: metadata.description,
          url: `${SITE_URL}/tools`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        }}
      />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">SaaS finance tools</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">Free SaaS Finance Calculators</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Use these lightweight SaaS calculators to understand recurring revenue, retention, acquisition efficiency, growth quality, and capital efficiency. Each tool includes formulas, interpretation notes, exports, and educational disclaimers.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {metricTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/[0.07]">
              <div className="flex items-start gap-4">
                <div className="rounded-md border border-teal-300/20 bg-teal-300/[0.08] p-3 text-teal-300">
                  <Calculator size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{tool.category}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{tool.shortTitle}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{tool.description}</p>
              <p className="mt-4 font-mono text-sm text-teal-200">{tool.formulaPreview}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                Open calculator <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-10 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FileSpreadsheet size={20} className="text-teal-300" />
                <h2 className="text-2xl font-semibold text-white">Need spreadsheet detail?</h2>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Use the SaaS forecasting spreadsheet template when you want a month-by-month model with new MRR, expansion MRR, churned MRR, ending MRR, and ARR.
              </p>
            </div>
            <Link href="/templates/saas-revenue-forecast" className="inline-flex shrink-0 items-center justify-center rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">
              Open template
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
