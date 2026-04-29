import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, Calculator, Monitor } from 'lucide-react';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { AMAZON_DISCLOSURE, AFFILIATE_SECTION_DISCLOSURE, resourcePages } from '@/lib/affiliate-resources';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SaaS Founder Resources',
  description: 'Curated SaaS founder resources including finance books, planning tools, office setup recommendations, templates, and Aura Revenue calculators.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'SaaS Founder Resources | Aura Revenue',
    description: 'Curated resources for SaaS founders learning MRR, ARR, churn, retention, forecasting, pricing, and startup planning.',
    url: '/resources',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS founder resources' }],
  },
};

const resourceCards = [
  { slug: 'best-saas-finance-books', label: 'Best SaaS finance books', Icon: BookOpen },
  { slug: 'startup-planning-tools', label: 'Startup planning tools', Icon: Calculator },
  { slug: 'founder-office-setup', label: 'Founder office setup', Icon: Monitor },
  { slug: 'saas-founder-toolkit', label: 'SaaS founder toolkit', Icon: BriefcaseBusiness },
];

const relatedLinks = [
  ['Open the SaaS MRR calculator', '/calculator'],
  ['Browse SaaS finance guides', '/learn'],
  ['Use the calculator toolkit', '/tools'],
  ['Download the forecasting template', '/templates/saas-revenue-forecast'],
  ['Read the methodology', '/methodology'],
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'SaaS Founder Resources',
          description: metadata.description,
          url: `${SITE_URL}/resources`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        }}
      />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Founder resources</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">SaaS Founder Resources</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Curated books, planning tools, office setup recommendations, templates, and Aura Revenue tools for founders building and forecasting recurring-revenue businesses.
        </p>
        <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-4 text-sm leading-6 text-amber-50/90">
          {AMAZON_DISCLOSURE} {AFFILIATE_SECTION_DISCLOSURE}
        </p>

        <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {resourceCards.map(({ slug, label, Icon }) => {
            const page = resourcePages.find((item) => item.slug === slug);
            return page ? (
              <Link key={slug} href={`/resources/${slug}`} className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/[0.07]">
                <Icon size={22} className="text-teal-300" />
                <h2 className="mt-4 text-xl font-semibold text-white">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{page.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                  Open guide <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ) : null;
          })}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-white/10 bg-[#11191b] p-6">
            <h2 className="text-2xl font-semibold text-white">How these resources are selected</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
              <p>
                Aura Revenue only recommends resources that support SaaS founder work: learning recurring revenue metrics, improving planning discipline, making better pricing decisions, working in dashboards and spreadsheets, or communicating better with customers.
              </p>
              <p>
                Recommendations avoid live prices, copied reviews, Amazon product images, fake testing claims, and unrelated gadgets. Product availability and details can change, so always review the Amazon page before buying.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-6">
            <h2 className="text-2xl font-semibold text-white">Start with the free Aura Revenue tools</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Product recommendations are secondary. If you are planning a SaaS business, start with the calculator, methodology, templates, and educational guides.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedLinks.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-md border border-white/10 bg-slate-950/35 p-4 text-sm font-semibold text-slate-200 hover:border-teal-300/40">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-semibold text-white">Resource FAQ</h2>
          <div className="mt-4 space-y-3">
            {[
              ['Are these recommendations financial advice?', 'No. These are educational resource recommendations for founders and operators. They are not financial, tax, accounting, legal, or investment advice.'],
              ['Does Aura Revenue test every product?', 'No. Aura Revenue does not claim hands-on testing unless explicitly stated. Recommendations are curated for relevance, fit, and usefulness to SaaS founders.'],
              ['Why are there Amazon links?', 'Some recommendations link to Amazon for convenience. Aura Revenue may earn from qualifying purchases at no extra cost to you.'],
            ].map(([question, answer], index) => (
              <details key={question} open={index === 0} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer font-semibold text-white">{question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-5 text-sm leading-6 text-amber-50/90">
          Aura Revenue provides educational forecasting tools, examples, and resource recommendations only. Content should not be treated as financial, tax, accounting, legal, or investment advice.
        </p>
      </main>
    </PageShell>
  );
}
