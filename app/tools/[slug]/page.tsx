import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { MetricToolCalculator } from '@/components/site/metric-tool-calculator';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { getMetricTool, metricTools } from '@/lib/metric-tools';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return metricTools.map((tool) => ({ slug: tool.slug }));
}

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getMetricTool(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.title} | Aura Revenue`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `${tool.title} by Aura Revenue` }],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getMetricTool(slug);
  if (!tool) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.title,
        url: `${SITE_URL}/tools/${tool.slug}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: tool.description,
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
          { '@type': 'ListItem', position: 3, name: tool.shortTitle, item: `${SITE_URL}/tools/${tool.slug}` },
        ],
      },
      {
        '@type': 'WebPage',
        name: tool.title,
        url: `${SITE_URL}/tools/${tool.slug}`,
        description: tool.description,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={schema} />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Free SaaS calculator</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{tool.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{tool.intro}</p>

        <section className="my-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-2xl font-semibold text-white">How to use this calculator</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {tool.howToUse.map((step, index) => (
              <div key={step} className="rounded-md border border-white/10 bg-slate-950/35 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-300 text-sm font-bold text-slate-950">{index + 1}</span>
                <p className="mt-4 text-sm leading-6 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <MetricToolCalculator key={tool.slug} slug={tool.slug} />

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold text-white">Common mistakes to avoid</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {tool.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold text-white">Related resources</h2>
            <div className="mt-4 grid gap-3">
              {tool.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="group rounded-md border border-white/10 bg-slate-950/35 p-4 text-sm font-semibold text-slate-200 hover:border-teal-300/40">
                  <span className="inline-flex items-center gap-2">
                    {link.label} <ArrowRight size={14} className="text-teal-300 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 max-w-4xl">
          <h2 className="text-2xl font-semibold text-white">{tool.shortTitle} FAQ</h2>
          <div className="mt-4 space-y-3">
            {tool.faq.map((item, index) => (
              <details key={item.question} open={index === 0} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer font-semibold text-white">{item.question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
