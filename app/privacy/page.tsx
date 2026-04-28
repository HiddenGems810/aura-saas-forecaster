import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PRIVACY_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Aura Revenue, including calculator inputs, analytics, cookies, advertising, AdSense, and contact information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Aura Revenue',
    description: 'Privacy Policy for Aura Revenue, including calculator inputs, analytics, cookies, and advertising.',
    url: '/privacy',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function PrivacyPolicy() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: April 28, 2026</p>
        <div className="mt-8 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">Overview</h2>
            <p className="mt-4">Aura Revenue provides an educational SaaS MRR forecasting calculator and related content at aurarevenue.com. This policy explains what information may be collected when you use the site.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Calculator Inputs</h2>
            <p className="mt-4">The calculator uses inputs such as starting MRR, monthly growth rate, churn rate, and forecast period. These inputs are processed in your browser and may be stored in the page URL so you can share or revisit a scenario. Do not enter confidential business information into the URL if you do not want it visible in browser history or shared links.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Analytics, Logs, and Cookies</h2>
            <p className="mt-4">We may use hosting logs and analytics tools to understand site performance, pages visited, device type, browser type, referring pages, approximate region, and aggregate usage patterns. These tools may use cookies or similar technologies. You can control cookies through your browser settings.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Third-Party Advertising and Cookies</h2>
            <p className="mt-4">Aura Revenue may display advertising through third-party advertising services, including Google AdSense. Third-party vendors, including Google, may use cookies, web beacons, IP addresses, device identifiers, and similar technologies when ads or measurement tools are served on this site.</p>
            <p className="mt-4">These technologies may be used to serve ads based on a user&apos;s prior visits to Aura Revenue or other websites, measure ad performance, prevent fraud and abuse, and understand aggregate ad delivery. Third parties may collect or receive information from this site and elsewhere on the internet and use that information to provide measurement services and targeted ads.</p>
            <p className="mt-4">You can manage or opt out of personalized advertising through <a className="text-teal-300 hover:text-teal-200" href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>, browser cookie controls, and device privacy settings. You can also learn how Google uses data from partner sites and apps at <a className="text-teal-300 hover:text-teal-200" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google&apos;s partner sites and apps explanation</a>.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">How Information Is Used</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>To operate and improve the calculator and educational content.</li>
              <li>To monitor performance, diagnose errors, and protect the site from abuse.</li>
              <li>To understand aggregate content usage and improve navigation.</li>
              <li>To support advertising and comply with legal or platform requirements.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p className="mt-4">For privacy questions or requests, contact <a className="text-teal-300 hover:text-teal-200" href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.</p>
          </section>
        </div>
        <div className="mt-10 flex gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-teal-300 hover:text-teal-200" href="/terms">Terms of Service</Link>
          <Link className="text-teal-300 hover:text-teal-200" href="/contact">Contact</Link>
          <Link className="text-teal-300 hover:text-teal-200" href="/editorial-policy">Editorial Policy</Link>
        </div>
      </main>
    </PageShell>
  );
}
