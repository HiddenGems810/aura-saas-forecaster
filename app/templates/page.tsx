import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';

export const metadata: Metadata = {
  title: 'SaaS Revenue Forecast Templates',
  description: 'Free SaaS revenue forecast templates for modeling MRR, new revenue, expansion, churned MRR, ending MRR, and ARR.',
  alternates: { canonical: '/templates' },
  openGraph: {
    title: 'SaaS Revenue Forecast Templates | Aura Revenue',
    description: 'Free SaaS revenue forecast templates for modeling MRR, new revenue, expansion, churned MRR, and ARR.',
    url: '/templates',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function TemplatesPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">SaaS Forecast Templates</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Copyable templates for turning a calculator scenario into a month-by-month SaaS operating model.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link href="/templates/saas-revenue-forecast" className="rounded-lg border border-white/10 bg-white/[0.04] p-6 hover:border-teal-300/40">
            <h2 className="text-2xl font-semibold text-white">Free SaaS Revenue Forecast Template</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              A practical table structure with month, starting MRR, new MRR, expansion MRR, churned MRR, ending MRR, and ARR.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-teal-300">Open template</span>
          </Link>
          <Link href="/examples/saas-forecast-5000-mrr" className="rounded-lg border border-white/10 bg-white/[0.04] p-6 hover:border-teal-300/40">
            <h2 className="text-2xl font-semibold text-white">$5K MRR Forecast Example</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              See a realistic twelve-month projection for a SaaS business starting at $5,000 MRR.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-teal-300">View example</span>
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
