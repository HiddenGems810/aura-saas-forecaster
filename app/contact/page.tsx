import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { CONTACT_EMAIL, LEGAL_EMAIL, PRIVACY_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Aura Revenue',
  description: 'Contact Aura Revenue for general questions, privacy requests, legal notices, corrections, and publisher inquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Contact Aura Revenue</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Use the contact paths below for questions, corrections, privacy requests, and legal notices. Aura Revenue does not list a physical office address because it does not operate a public storefront.
        </p>
        <div className="mt-10 grid gap-4">
          {[
            ['General contact', CONTACT_EMAIL, 'Questions about the calculator, content, templates, or publisher information.'],
            ['Privacy contact', PRIVACY_EMAIL, 'Privacy policy questions, data requests, and cookie or advertising questions.'],
            ['Legal contact', LEGAL_EMAIL, 'Terms of service questions, notices, or other legal communications.'],
          ].map(([label, email, text]) => (
            <div key={email} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">{label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              <a className="mt-3 inline-block text-teal-300 hover:text-teal-200" href={`mailto:${email}`}>{email}</a>
            </div>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
