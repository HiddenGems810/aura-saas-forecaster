import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aura Revenue Forecasting Methodology',
  description: 'How Aura Revenue calculates SaaS MRR projections, applies growth and churn, and explains forecast limitations.',
  alternates: { canonical: '/methodology' },
};

export default function MethodologyPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Aura Revenue Forecasting Methodology',
          description: metadata.description,
          datePublished: '2026-04-28',
          dateModified: '2026-04-28',
          mainEntityOfPage: `${SITE_URL}/methodology`,
          author: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <article>
          <h1 className="text-4xl font-bold tracking-tight text-white">Aura Revenue Forecasting Methodology</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Aura Revenue uses a transparent monthly recurring revenue model. The calculator is built for education and scenario planning, not for guaranteed financial prediction.
          </p>
          <div className="mt-10 space-y-10 text-base leading-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white">Core Monthly Formula</h2>
              <p className="mt-4">Each month is calculated as: ending MRR = starting MRR + new MRR - churned MRR.</p>
              <p className="mt-4">New MRR is starting MRR multiplied by the monthly growth rate. Churned MRR is starting MRR multiplied by the monthly churn rate. Ending MRR becomes the next month starting MRR. ARR run rate is ending MRR multiplied by twelve. Total forecast revenue is the sum of projected ending MRR across the selected months.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Assumptions Used</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Starting MRR is the current recurring revenue base.</li>
                <li>Monthly growth represents recurring revenue added relative to the starting MRR for that month.</li>
                <li>Monthly churn represents recurring revenue lost relative to the starting MRR for that month.</li>
                <li>The same growth and churn assumptions repeat throughout the forecast period.</li>
                <li>Annual recurring revenue is shown as an annualized run rate, not guaranteed annual collections.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">What the Calculator Does Not Account For</h2>
              <p className="mt-4">The public calculator does not model taxes, refunds, failed payments, payment processing fees, discounts, seasonality, one-time implementation revenue, sales capacity, customer acquisition cost, cash timing, contract renewal dates, revenue recognition rules, or custom enterprise contract terms unless you manually adjust the inputs to approximate those effects.</p>
              <p className="mt-4">For a more complete operating model, use the <Link className="text-teal-300 hover:text-teal-200" href="/templates/saas-revenue-forecast">SaaS revenue forecast template</Link> and separate new MRR, expansion MRR, contraction MRR, and churned MRR.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Limitations</h2>
              <p className="mt-4">There is no guarantee of future revenue. Forecast accuracy depends on the quality of the assumptions entered. Actual performance can differ because of product changes, competitive pressure, pricing changes, market demand, macroeconomic conditions, customer behavior, and execution.</p>
              <p className="mt-4">The methodology is related to concepts explained in the guides on <Link className="text-teal-300 hover:text-teal-200" href="/learn/what-is-mrr">MRR</Link>, <Link className="text-teal-300 hover:text-teal-200" href="/learn/churn-rate">churn</Link>, <Link className="text-teal-300 hover:text-teal-200" href="/learn/net-revenue-retention">net revenue retention</Link>, and <Link className="text-teal-300 hover:text-teal-200" href="/learn/saas-growth-model">SaaS revenue forecasting</Link>.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Update History</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>April 28, 2026: clarified formula, assumptions, exclusions, and educational disclaimer.</li>
                <li>April 28, 2026: added crawlable methodology page and internal links to related SaaS finance guides.</li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
