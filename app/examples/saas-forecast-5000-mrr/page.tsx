import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Example: Forecasting a SaaS Business Starting at $5K MRR',
  description: 'A practical twelve-month SaaS forecast example for a business starting at $5,000 MRR with growth and churn assumptions.',
  alternates: { canonical: '/examples/saas-forecast-5000-mrr' },
  openGraph: {
    title: 'Example: Forecasting a SaaS Business Starting at $5K MRR | Aura Revenue',
    description: 'A practical twelve-month SaaS forecast example for a business starting at $5,000 MRR with growth and churn assumptions.',
    url: '/examples/saas-forecast-5000-mrr',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

const exampleRows = [
  [1, 5000, 400, 105, 5295, 63540],
  [2, 5295, 424, 111, 5608, 67296],
  [3, 5608, 449, 118, 5939, 71268],
  [4, 5939, 475, 125, 6289, 75468],
  [5, 6289, 503, 132, 6660, 79920],
  [6, 6660, 533, 140, 7053, 84636],
  [7, 7053, 564, 148, 7469, 89628],
  [8, 7469, 598, 157, 7910, 94920],
  [9, 7910, 633, 166, 8377, 100524],
  [10, 8377, 670, 176, 8871, 106452],
  [11, 8871, 710, 186, 9395, 112740],
  [12, 9395, 752, 197, 9950, 119400],
];

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default function ExamplePage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Example: Forecasting a SaaS Business Starting at $5K MRR',
          description: metadata.description,
          datePublished: '2026-04-28',
          dateModified: '2026-04-28',
          mainEntityOfPage: `${SITE_URL}/examples/saas-forecast-5000-mrr`,
          author: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <article>
          <h1 className="text-4xl font-bold tracking-tight text-white">Example: Forecasting a SaaS Business Starting at $5K MRR</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            This example models a small SaaS company that has reached $5,000 in monthly recurring revenue and wants a realistic first pass at the next twelve months. The assumptions are not predictions. They are a working scenario for learning how growth and churn interact.
          </p>

          <section className="mt-10 grid gap-4 sm:grid-cols-4">
            {[
              ['Starting MRR', '$5,000'],
              ['Monthly growth', '8.0%'],
              ['Monthly churn', '2.1%'],
              ['Forecast period', '12 months'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-white">Month-by-Month Forecast</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/[0.06] text-left text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3">Starting MRR</th>
                    <th className="px-4 py-3">New MRR</th>
                    <th className="px-4 py-3">Churned MRR</th>
                    <th className="px-4 py-3">Ending MRR</th>
                    <th className="px-4 py-3">ARR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-300">
                  {exampleRows.map(([month, starting, growth, churn, ending, arr]) => (
                    <tr key={month}>
                      <td className="px-4 py-3">{month}</td>
                      <td className="px-4 py-3">{money(starting)}</td>
                      <td className="px-4 py-3 text-teal-200">{money(growth)}</td>
                      <td className="px-4 py-3 text-rose-200">{money(churn)}</td>
                      <td className="px-4 py-3 font-semibold text-white">{money(ending)}</td>
                      <td className="px-4 py-3">{money(arr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 space-y-4 text-base leading-8 text-slate-300">
            <h2 className="text-2xl font-semibold text-white">What the Founder Should Learn</h2>
            <p>The company nearly doubles MRR over twelve months in this scenario, ending near $9,950 MRR. That is a strong result for a small SaaS business, but it depends on maintaining 8% monthly growth while keeping churn near 2.1%. If churn rises or acquisition slows, the forecast changes quickly.</p>
            <p>The example also shows why ARR run rate is not the same as cash collected. By month twelve, ARR run rate is about $119,400, but that does not mean the company collected $119,400 during the year. It means the month twelve recurring revenue base annualizes to that level if sustained.</p>
            <p>Use this example as a model for your own planning. Replace the assumptions with your current MRR, actual churn, and realistic growth rate. Then compare the result with a downside case. Open the <Link className="text-teal-300 hover:text-teal-200" href="/calculator?mrr=5000&growth=8&churn=2.1&months=12">calculator prefilled with this scenario</Link>, or copy the <Link className="text-teal-300 hover:text-teal-200" href="/templates/saas-revenue-forecast">SaaS revenue forecast template</Link>.</p>
          </section>
        </article>
      </main>
    </PageShell>
  );
}
