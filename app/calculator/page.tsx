import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { SaasCalculator } from '@/components/site/saas-calculator';

export const metadata: Metadata = {
  title: 'SaaS MRR Forecasting Calculator',
  description: 'Forecast SaaS MRR, churn, ARR, and cumulative recurring revenue using clear educational assumptions.',
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: 'SaaS MRR Forecasting Calculator | Aura Revenue',
    description: 'Model SaaS MRR growth, churn impact, ARR run rate, and cumulative forecast revenue.',
    url: '/calculator',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

export default function CalculatorPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">SaaS MRR Forecasting Calculator</h1>
        <p className="mb-8 mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Use this SaaS MRR forecasting calculator to estimate future monthly recurring revenue, ARR run rate, churn impact, and cumulative forecast revenue based on your current MRR, growth rate, churn rate, and forecast period. The model is educational and uses simplified assumptions, so results should be treated as planning estimates rather than financial advice.
        </p>
        <SaasCalculator />
      </main>
    </PageShell>
  );
}
