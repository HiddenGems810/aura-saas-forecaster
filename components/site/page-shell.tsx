import { ReactNode } from 'react';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1114] text-slate-100">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
