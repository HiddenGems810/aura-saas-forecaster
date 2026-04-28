import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free SaaS Revenue Forecast Template',
  description: 'Copy a free SaaS revenue forecast template with month, starting MRR, new MRR, expansion MRR, churned MRR, ending MRR, and ARR.',
  alternates: { canonical: '/templates/saas-revenue-forecast' },
  openGraph: {
    title: 'Free SaaS Revenue Forecast Template',
    description: 'A copyable SaaS MRR forecast template for founders and operators.',
    url: '/templates/saas-revenue-forecast',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

const rows = [
  ['Month', 'Starting MRR', 'New MRR', 'Expansion MRR', 'Churned MRR', 'Ending MRR', 'ARR'],
  ['1', '$10,000', '$1,000', '$250', '$300', '$10,950', '$131,400'],
  ['2', '$10,950', '$1,095', '$274', '$329', '$11,990', '$143,880'],
  ['3', '$11,990', '$1,199', '$300', '$360', '$13,129', '$157,548'],
];

export default function TemplatePage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Free SaaS Revenue Forecast Template',
          description: metadata.description,
          datePublished: '2026-04-28',
          dateModified: '2026-04-28',
          mainEntityOfPage: `${SITE_URL}/templates/saas-revenue-forecast`,
          author: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
        <article>
          <h1 className="text-4xl font-bold tracking-tight text-white">Free SaaS Revenue Forecast Template</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A SaaS revenue forecast template should make recurring revenue movement visible month by month. The table below is intentionally simple so founders can copy it into a spreadsheet before adding more advanced inputs such as acquisition channels, pricing tiers, expansion revenue, payment failures, or sales capacity.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/templates/saas-revenue-forecast-template.csv" download className="rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">
              Download CSV template
            </a>
            <Link href="/tools" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Open SaaS calculators
            </Link>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-white">What the Template Includes</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
              <p>Use starting MRR as the opening recurring revenue base for the month. Add new MRR from new customers and expansion MRR from upgrades, added seats, higher usage, or paid add-ons. Subtract churned MRR from cancellations. If you also track downgrades separately, add a contraction MRR column between expansion and churned MRR.</p>
              <p>Ending MRR becomes the following month starting MRR. ARR is ending MRR x 12. Cumulative forecast revenue can be added as another column by summing monthly ending MRR over the forecast period.</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-white">Copyable Forecast Table</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <tbody className="divide-y divide-white/10">
                  {rows.map((row, index) => (
                    <tr key={row.join('-')} className={index === 0 ? 'bg-white/[0.06] text-slate-200' : 'text-slate-300'}>
                      {row.map((cell) => <td key={cell} className="px-4 py-3">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-slate-950 p-4 text-sm text-slate-200">{`Month,Starting MRR,New MRR,Expansion MRR,Churned MRR,Ending MRR,ARR
1,10000,1000,250,300,10950,131400
2,10950,1095,274,329,11990,143880
3,11990,1199,300,360,13129,157548`}</pre>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-white">How to Use It</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
              <p>Start with your actual current MRR, not a target. If you have annual contracts, divide the annual recurring contract value by twelve to normalize it into MRR. Keep one-time services, setup fees, or implementation projects outside the recurring revenue columns unless they truly repeat.</p>
              <p>Next, create conservative, base, and aggressive versions of the model. The conservative case should include slower new MRR and higher churn than you want. The base case should reflect your current sales and retention motion. The aggressive case should be tied to specific changes, such as better activation, new pricing, channel expansion, or a stronger expansion revenue motion.</p>
              <p>Use the <Link className="text-teal-300 hover:text-teal-200" href="/calculator">Aura Revenue calculator</Link> to test the shape of the curve quickly, then use the template for the operating detail. Read the <Link className="text-teal-300 hover:text-teal-200" href="/methodology">methodology</Link> to understand what the public calculator includes and what a deeper spreadsheet should add.</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-white">Metrics to Add Beside the Template</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The forecast table explains monthly recurring revenue movement. For a fuller operating dashboard, add retention and efficiency metrics beside it: revenue churn, net revenue retention, CAC payback, burn multiple, and Rule of 40. These metrics help explain whether growth is durable, efficient, and realistic.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ['ARR run rate calculator', '/tools/arr-run-rate-calculator'],
                ['SaaS churn calculator', '/tools/saas-churn-calculator'],
                ['CAC payback calculator', '/tools/cac-payback-calculator'],
                ['Rule of 40 calculator', '/tools/rule-of-40-calculator'],
                ['NRR calculator', '/tools/net-revenue-retention-calculator'],
                ['Burn multiple calculator', '/tools/saas-burn-multiple-calculator'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-200 hover:border-teal-300/40">
                  {label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-5">
            <h2 className="text-xl font-semibold text-amber-100">Important disclaimer</h2>
            <p className="mt-2 text-sm leading-6 text-amber-50/90">
              Aura Revenue provides educational forecasting tools and examples only. Outputs are estimates based on user-provided assumptions and should not be treated as financial, legal, tax, accounting, or investment advice.
            </p>
          </section>
        </article>
      </main>
    </PageShell>
  );
}
