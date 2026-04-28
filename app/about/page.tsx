import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Aura Revenue',
  description: 'Learn what Aura Revenue does, who it helps, why the forecasting tool exists, and how to contact the publisher.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Aura Revenue',
    description: 'Learn what Aura Revenue does, who it helps, why the forecasting tool exists, and how to contact the publisher.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">About Aura Revenue</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-slate-300">
          <p>{SITE_NAME} is an educational SaaS revenue forecasting resource. The site combines a free MRR calculator with practical guides about monthly recurring revenue, ARR, churn, net revenue retention, SaaS forecasting, benchmarks, templates, and operating assumptions.</p>
          <p>Aura Revenue helps founders, operators, creators, and small software businesses understand how recurring revenue changes over time. The tool is especially useful when a team wants to compare growth scenarios, see how churn affects a long-range projection, or translate a rough goal into monthly SaaS finance assumptions.</p>
          <p>The site exists because many lightweight SaaS calculators show a number without explaining the assumptions behind it. Aura Revenue is designed to make the model visible: starting MRR, monthly growth, monthly churn, forecast period, ending MRR, ARR run rate, and cumulative forecast revenue.</p>
          <p>The publisher of Aura Revenue is the operator of aurarevenue.com. We publish original educational content and templates for SaaS finance literacy. We do not present calculator results as guarantees, investment advice, tax advice, accounting advice, or legal advice.</p>
          <p>For general questions, corrections, or publisher inquiries, contact <a className="text-teal-300 hover:text-teal-200" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">Contact Aura Revenue</Link>
          <Link href="/editorial-policy" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">Editorial Policy</Link>
        </div>
      </main>
    </PageShell>
  );
}
