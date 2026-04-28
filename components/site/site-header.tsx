'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { primaryNav, SITE_NAME } from '@/lib/site';

function isActivePath(pathname: string, href: string) {
  if (href === '/calculator') return pathname === '/calculator' || pathname === '/';
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071013]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${SITE_NAME} home`} className="flex shrink-0 items-center gap-3">
          <Image
            src="/favicon.png"
            alt=""
            width={56}
            height={56}
            priority
            className="h-9 w-9 rounded-md object-contain sm:h-10 sm:w-10"
            sizes="40px"
          />
          <span className="text-xl font-semibold tracking-tight text-white sm:text-[22px]">{SITE_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 text-sm lg:flex">
          {primaryNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 transition ${
                  active
                    ? 'bg-teal-300/12 text-teal-200 ring-1 ring-teal-300/20'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/calculator" className="ml-2 rounded-md bg-teal-300 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-200">
            Open calculator
          </Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-slate-100 lg:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <nav aria-label="Mobile navigation" className="border-t border-white/10 px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {primaryNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm ${
                    active ? 'bg-teal-300/12 text-teal-200' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
