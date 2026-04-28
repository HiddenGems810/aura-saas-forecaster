import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_EMAIL, footerNav, SITE_NAME } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#071013]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Link href="/" aria-label={`${SITE_NAME} home`} className="flex items-center gap-3">
            <Image
              src="/favicon.png"
              alt=""
              width={56}
              height={56}
              className="h-10 w-10 rounded-md object-contain"
              sizes="40px"
            />
            <span className="text-2xl font-semibold tracking-tight text-white">{SITE_NAME}</span>
          </Link>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
            Educational SaaS MRR forecasting tools and finance explainers for founders,
            operators, creators, and small software businesses.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Contact: <a className="text-teal-300 hover:text-teal-200" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-500">
            Content reviewed and updated: April 2026. Educational information only. Not financial, investment, tax, or legal advice.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-300 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} {SITE_NAME}. Educational information only; not financial, investment, tax, or legal advice.
      </div>
    </footer>
  );
}
