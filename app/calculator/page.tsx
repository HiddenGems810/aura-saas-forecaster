import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { SaasCalculator } from '@/components/site/saas-calculator';

export const metadata: Metadata = {
  title: 'SaaS MRR Forecasting Calculator',
  description: 'Forecast SaaS MRR, churn, ARR, and cumulative recurring revenue using clear educational assumptions.',
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: 'SaaS MRR Forecasting Calculator',
    description: 'Model SaaS MRR growth, churn impact, ARR run rate, and cumulative forecast revenue.',
    url: '/calculator',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function CalculatorPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-white">SaaS MRR Forecasting Calculator</h1>
        <SaasCalculator />
      </main>
    </PageShell>
  );
}
