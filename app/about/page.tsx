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
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">About Aura Revenue</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-slate-300">
          <p>{SITE_NAME} is published by Ger&apos;Quia Abner, an independent digital product builder creating educational tools for SaaS founders, operators, creators, and small software businesses. The site exists to make recurring revenue forecasting easier to understand through calculators, templates, examples, plain-English guides, and practical financial education.</p>
          <p>Aura Revenue combines a free MRR calculator with practical guides about monthly recurring revenue, ARR, churn, net revenue retention, SaaS forecasting, benchmarks, templates, and operating assumptions.</p>
          <p>The site does not claim licensed financial, tax, legal, investment, or accounting expertise. Calculator outputs and articles are educational planning aids, not professional advice or guaranteed business outcomes.</p>
          <p>For general questions, corrections, or publisher inquiries, contact <a className="text-teal-300 hover:text-teal-200" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
        <div className="mt-10 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">Why Aura Revenue exists</h2>
            <p className="mt-4">Many lightweight SaaS calculators show a result without explaining the assumptions behind it. Aura Revenue is designed to make the model visible: starting MRR, monthly growth, monthly churn, forecast period, ending MRR, ARR run rate, and cumulative forecast revenue.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">What we publish</h2>
            <p className="mt-4">Aura Revenue publishes original SaaS finance education, calculator explanations, scenario examples, forecasting templates, methodology notes, and practical guides for understanding recurring revenue. Content is written to be useful before it is monetizable.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Important disclaimer</h2>
            <p className="mt-4">Aura Revenue provides educational forecasting tools and examples only. Outputs are estimates based on user-provided assumptions and should not be treated as financial, legal, tax, accounting, or investment advice.</p>
          </section>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">Contact Aura Revenue</Link>
          <Link href="/editorial-policy" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">Editorial Policy</Link>
          <Link href="/methodology" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">Methodology</Link>
          <Link href="/privacy" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">Privacy Policy</Link>
          <Link href="/terms" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">Terms</Link>
        </div>
      </main>
    </PageShell>
  );
}
