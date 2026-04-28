import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SaaS KPI Glossary',
  description: 'Plain-English SaaS KPI glossary covering MRR, ARR, churn, NRR, GRR, CAC payback, burn multiple, Rule of 40, and retention metrics.',
  alternates: { canonical: '/learn/saas-kpi-glossary' },
  openGraph: {
    title: 'SaaS KPI Glossary | Aura Revenue',
    description: 'Definitions, formulas, and interpretation notes for common SaaS finance metrics.',
    url: '/learn/saas-kpi-glossary',
    type: 'article',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS KPI glossary' }],
  },
};

const terms = [
  {
    term: 'MRR',
    name: 'Monthly Recurring Revenue',
    formula: 'Sum of recurring subscription revenue normalized to one month',
    definition: 'MRR is the predictable monthly subscription revenue from active recurring customers. It excludes one-time setup fees, consulting, hardware, and non-recurring services.',
    link: '/learn/what-is-mrr',
  },
  {
    term: 'ARR',
    name: 'Annual Recurring Revenue',
    formula: 'ARR = MRR x 12',
    definition: 'ARR annualizes recurring revenue. It is useful for scale context, but ARR run rate is not a guarantee that the business will collect that amount over the next year.',
    link: '/learn/mrr-vs-arr',
  },
  {
    term: 'Revenue Churn',
    name: 'Churned recurring revenue',
    formula: 'Revenue churn rate = Churned MRR / Starting MRR',
    definition: 'Revenue churn measures lost recurring revenue as a percentage of the starting recurring base. It can include cancellations and, in simple models, downgrades.',
    link: '/learn/churn-rate',
  },
  {
    term: 'NRR',
    name: 'Net Revenue Retention',
    formula: 'NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR',
    definition: 'NRR shows whether an existing customer cohort grows or shrinks after expansion, contraction, and churn. It excludes revenue from new customers.',
    link: '/learn/net-revenue-retention',
  },
  {
    term: 'GRR',
    name: 'Gross Revenue Retention',
    formula: 'GRR = (Starting MRR - Contraction - Churn) / Starting MRR',
    definition: 'GRR measures retained recurring revenue before expansion. It is stricter than NRR because expansion cannot hide downgrade or cancellation pressure.',
    link: '/learn/gross-revenue-retention-vs-net-revenue-retention',
  },
  {
    term: 'CAC Payback',
    name: 'Customer acquisition cost payback',
    formula: 'CAC payback = CAC / monthly gross profit',
    definition: 'CAC payback estimates how many months of gross profit are needed to recover the cost of acquiring a customer.',
    link: '/learn/saas-cac-payback',
  },
  {
    term: 'Rule of 40',
    name: 'Growth and profitability score',
    formula: 'Rule of 40 score = Revenue growth rate + Profit margin',
    definition: 'The Rule of 40 combines growth and profitability into one directional SaaS efficiency benchmark. It needs context and should not be used alone.',
    link: '/learn/rule-of-40-saas',
  },
  {
    term: 'Burn Multiple',
    name: 'Capital efficiency ratio',
    formula: 'Burn multiple = Net burn / Net new ARR',
    definition: 'Burn multiple estimates how much net burn is required to create one dollar of net new ARR during the same period.',
    link: '/learn/saas-burn-multiple',
  },
  {
    term: 'Expansion MRR',
    name: 'Recurring revenue expansion',
    formula: 'Expansion MRR = upgrades + added seats + usage growth + add-ons',
    definition: 'Expansion MRR is additional recurring revenue from existing customers. It can improve NRR and make growth less dependent on new customer acquisition.',
    link: '/learn/expansion-revenue',
  },
  {
    term: 'Net New MRR',
    name: 'Monthly recurring revenue movement',
    formula: 'Net new MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR',
    definition: 'Net new MRR explains the monthly change in recurring revenue after additions, expansion, downgrades, and churn.',
    link: '/calculator',
  },
];

const calculators = [
  ['ARR Run Rate Calculator', '/tools/arr-run-rate-calculator'],
  ['SaaS Churn Calculator', '/tools/saas-churn-calculator'],
  ['CAC Payback Calculator', '/tools/cac-payback-calculator'],
  ['Rule of 40 Calculator', '/tools/rule-of-40-calculator'],
  ['NRR Calculator', '/tools/net-revenue-retention-calculator'],
  ['Burn Multiple Calculator', '/tools/saas-burn-multiple-calculator'],
];

export default function SaasKpiGlossaryPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'SaaS KPI Glossary',
          description: metadata.description,
          datePublished: '2026-04-28',
          dateModified: '2026-04-28',
          mainEntityOfPage: `${SITE_URL}/learn/saas-kpi-glossary`,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <article>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">SaaS finance reference</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">SaaS KPI Glossary</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A plain-English glossary for the SaaS finance metrics used across Aura Revenue calculators and guides. Use it to check definitions, formulas, and common interpretation limits before building a forecast.
          </p>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            {terms.map((item) => (
              <div key={item.term} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">{item.term}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.definition}</p>
                <p className="mt-4 rounded-md border border-white/10 bg-slate-950/45 p-3 font-mono text-sm leading-6 text-teal-200">{item.formula}</p>
                <Link href={item.link} className="mt-4 inline-block text-sm font-semibold text-teal-300 hover:text-teal-200">
                  Learn more
                </Link>
              </div>
            ))}
          </section>

          <section className="mt-10 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-6">
            <h2 className="text-2xl font-semibold text-white">Use the glossary with calculators</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Definitions are easier to understand when they are tied to numbers. Use the calculators below to test how these metrics change under different assumptions.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {calculators.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-md border border-white/10 bg-slate-950/35 p-4 text-sm font-semibold text-slate-200 hover:border-teal-300/40">
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
