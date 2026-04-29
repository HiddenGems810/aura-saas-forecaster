import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import {
  AFFILIATE_SECTION_DISCLOSURE,
  AMAZON_DISCLOSURE,
  getAffiliateUrl,
  getProductById,
  getProductsForPage,
  getResourcePage,
  resourcePages,
} from '@/lib/affiliate-resources';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return resourcePages.map((page) => ({ slug: page.slug }));
}

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/resources/${page.slug}` },
    openGraph: {
      title: `${page.title} | Aura Revenue`,
      description: page.description,
      url: `/resources/${page.slug}`,
      type: 'article',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `${page.title} by Aura Revenue` }],
    },
  };
}

export default async function AffiliateResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) notFound();

  const products = getProductsForPage(page.slug);
  const quickPicks = page.quickPickIds.map(getProductById).filter((product): product is NonNullable<typeof product> => Boolean(product));
  const groupedProducts = products.reduce<Record<string, typeof products>>((groups, product) => {
    groups[product.category] = [...(groups[product.category] ?? []), product];
    return groups;
  }, {});

  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: page.title,
              description: page.description,
              datePublished: '2026-04-28',
              dateModified: '2026-04-28',
              mainEntityOfPage: `${SITE_URL}/resources/${page.slug}`,
              author: { '@type': 'Organization', name: SITE_NAME },
              publisher: { '@type': 'Organization', name: SITE_NAME },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE_URL}/resources` },
                { '@type': 'ListItem', position: 3, name: page.title, item: `${SITE_URL}/resources/${page.slug}` },
              ],
            },
          ],
        }}
      />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Founder resources</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{page.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p>
        <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-4 text-sm leading-6 text-amber-50/90">
          {AMAZON_DISCLOSURE}
        </p>

        <section className="mt-10 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-6">
          <h2 className="text-2xl font-semibold text-white">Quick picks by use case</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickPicks.map((product) => (
              <a
                key={product.id}
                href={getAffiliateUrl(product)}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="group rounded-md border border-white/10 bg-slate-950/35 p-4 hover:border-teal-300/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{product.category}</p>
                <h3 className="mt-2 font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">Best for: {product.bestFor}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                  View on Amazon <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-400">{AFFILIATE_SECTION_DISCLOSURE}</p>
        </section>

        <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">Buying guidance for SaaS founders</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
            {page.buyingGuide.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <div className="mt-10 space-y-10">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold text-white">{category}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {items.map((product) => (
                  <article key={product.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">{product.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
                    <p className="mt-3 text-sm font-semibold text-slate-200">Best for: {product.bestFor}</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <p><span className="font-semibold text-white">Why it helps:</span> {product.whyItHelps}</p>
                      <p><span className="font-semibold text-white">Consider before buying:</span> {product.consider}</p>
                    </div>
                    <a
                      href={getAffiliateUrl(product)}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200"
                    >
                      View on Amazon <ExternalLink size={15} />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-6">
          <h2 className="text-2xl font-semibold text-white">Related Aura Revenue tools and guides</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Use the free Aura Revenue tools first, then use products only where they improve learning, planning, or execution.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-md border border-white/10 bg-slate-950/35 p-4 text-sm font-semibold text-slate-200 hover:border-teal-300/40">
                <span className="inline-flex items-center gap-2">
                  {link.label} <ArrowRight size={14} className="text-teal-300 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <div className="mt-4 space-y-3">
            {page.faq.map((item, index) => (
              <details key={item.question} open={index === 0} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer font-semibold text-white">{item.question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-5 text-sm leading-6 text-amber-50/90">
          Aura Revenue provides educational forecasting tools, examples, and resource recommendations only. Recommendations are not financial, tax, accounting, legal, or investment advice. Product availability, pricing, and details can change on Amazon.
        </p>
      </main>
    </PageShell>
  );
}
