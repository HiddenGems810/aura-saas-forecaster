import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site';

const productLinks = [
  { href: '/calculator', label: 'Calculator' },
  { href: '/templates', label: 'Templates' },
  { href: '/examples/saas-forecast-5000-mrr', label: 'Example Forecast' },
  { href: '/methodology', label: 'Methodology' },
];

const learnLinks = [
  { href: '/learn', label: 'All Guides' },
  { href: '/learn/what-is-mrr', label: 'What Is MRR?' },
  { href: '/learn/churn-rate', label: 'Churn Rate' },
  { href: '/learn/net-revenue-retention', label: 'Net Revenue Retention' },
  { href: '/learn/saas-benchmarks', label: 'SaaS Benchmarks' },
];

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/sitemap.xml', label: 'Sitemap' },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300/80">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.06] bg-[#060d10]">
      {/* Subtle gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(94,234,212,0.3) 30%, rgba(94,234,212,0.5) 50%, rgba(94,234,212,0.3) 70%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Main grid ── */}
        <div className="grid gap-12 pb-12 pt-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand column */}
          <div className="lg:pr-8">
            <Link href="/" aria-label={`${SITE_NAME} home`} className="group inline-flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt=""
                width={56}
                height={56}
                className="h-10 w-10 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="40px"
              />
              <span className="text-xl font-semibold tracking-tight text-white">{SITE_NAME}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              Educational SaaS forecasting tools and finance explainers for founders, operators, and small
              software businesses.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {/* Email icon */}
              <svg
                className="h-4 w-4 shrink-0 text-teal-400/60"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <a
                className="text-sm text-teal-300/90 transition-colors duration-200 hover:text-teal-200"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Learn" links={learnLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center gap-3 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="max-w-md text-center text-xs leading-5 text-slate-600 sm:text-right">
            Educational information only. Not financial, investment, tax, or legal advice. Content reviewed
            April 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
