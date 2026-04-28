import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { LEGAL_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Aura Revenue, including educational-use disclaimer, acceptable use, no financial advice, and limitation of liability.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Aura Revenue',
    description: 'Terms of Service for Aura Revenue, including educational-use disclaimer, acceptable use, and no financial advice.',
    url: '/terms',
  },
};

export default function TermsOfService() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Terms of Service</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: April 28, 2026</p>
        <div className="mt-8 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">Educational Use</h2>
            <p className="mt-4">Aura Revenue provides educational SaaS forecasting tools, templates, and articles. The calculator creates hypothetical estimates based on the assumptions you enter. It does not connect to your accounting system, payment processor, bank, CRM, or live business data.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">No Financial, Tax, Legal, or Investment Advice</h2>
            <p className="mt-4">Aura Revenue content and calculator outputs are not financial advice, investment advice, tax advice, accounting advice, or legal advice. You are responsible for evaluating assumptions and consulting qualified professionals before making important business, financial, tax, or legal decisions.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Acceptable Use</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Do not use the site for unlawful activity.</li>
              <li>Do not attempt to disrupt, overload, probe, or compromise the site.</li>
              <li>Do not misrepresent Aura Revenue calculator outputs as guaranteed results.</li>
              <li>Do not copy site content or branding for republication without permission.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Advertising and Third-Party Links</h2>
            <p className="mt-4">The site may include advertising or links to third-party resources. Third-party sites and ads are not controlled by Aura Revenue, and their content, policies, and practices are their own responsibility.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Limitation of Liability</h2>
            <p className="mt-4">To the fullest extent permitted by law, Aura Revenue is not liable for indirect, incidental, consequential, special, punitive, or business-loss damages arising from use of the site, reliance on educational content, or reliance on calculator projections. The site is provided as is and as available without warranties of any kind.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p className="mt-4">For legal questions about these terms, contact <a className="text-teal-300 hover:text-teal-200" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.</p>
          </section>
        </div>
        <div className="mt-10 flex gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-teal-300 hover:text-teal-200" href="/privacy">Privacy Policy</Link>
          <Link className="text-teal-300 hover:text-teal-200" href="/contact">Contact</Link>
        </div>
      </main>
    </PageShell>
  );
}
