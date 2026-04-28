import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'Aura Revenue editorial policy for educational SaaS finance content, source handling, reviews, corrections, and disclaimers.',
  alternates: { canonical: '/editorial-policy' },
  openGraph: {
    title: 'Editorial Policy',
    description: 'Aura Revenue editorial policy for educational SaaS finance content, source handling, reviews, corrections, and disclaimers.',
    url: '/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Editorial Policy</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-slate-300">
          <p>Aura Revenue publishes educational SaaS finance content to help founders and operators understand recurring revenue metrics, forecasting assumptions, churn, ARR, MRR, net revenue retention, and related planning concepts.</p>
          <p>Content is created to be useful without advertising. Articles should include definitions, formulas, examples, limitations, and internal links to related resources. We avoid unsupported claims, guaranteed outcomes, copied competitor content, and generic filler that does not help a SaaS operator make a clearer planning decision.</p>
          <p>When benchmark or market claims are made, Aura Revenue uses source links to reputable references where practical. Benchmarks are framed as directional context, not guarantees or universal targets. If a claim is uncertain or varies by segment, the content should say so clearly.</p>
          <p>Content is periodically reviewed for accuracy, broken links, stale examples, and unclear assumptions. Corrections can be sent to <a className="text-teal-300 hover:text-teal-200" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          <p>Aura Revenue content is educational only and is not financial, investment, tax, legal, or accounting advice. Users should consult qualified professionals before making important financial or legal decisions.</p>
        </div>
      </main>
    </PageShell>
  );
}
