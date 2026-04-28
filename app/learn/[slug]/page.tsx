import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdPlaceholder } from '@/components/site/ad-placeholder';
import { AuthorReviewBlock } from '@/components/site/author-review-block';
import { JsonLd } from '@/components/site/json-ld';
import { PageShell } from '@/components/site/page-shell';
import { getArticle, learnArticles } from '@/lib/articles';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return learnArticles.map((article) => ({ slug: article.slug }));
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/learn/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/learn/${article.slug}`,
      type: 'article',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = article.related.map(getArticle).filter(Boolean);

  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          dateModified: article.updated,
          datePublished: article.updated,
          mainEntityOfPage: `${SITE_URL}/learn/${article.slug}`,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <article>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">SaaS finance guide</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{article.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{article.description}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
            <span>Last updated: April 2026</span>
            <span className="hidden sm:inline">|</span>
            <span>Category: SaaS Finance Education</span>
          </div>
          <AuthorReviewBlock />

          <div className="mt-10 space-y-10">
            {article.sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight text-white">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                </div>
                {index === 2 ? <AdPlaceholder position="article-mid" /> : null}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-teal-300/20 bg-teal-300/10 p-5">
            <h2 className="text-xl font-semibold text-white">Use the calculator with this concept</h2>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Open the <Link className="text-teal-200 underline" href="/calculator">SaaS MRR forecasting calculator</Link> to test how these assumptions change a revenue forecast.
            </p>
          </div>

          {article.sources ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold text-white">Sources and Further Reading</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-6 text-slate-300">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a className="text-teal-300 hover:text-teal-200" href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-10 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-5">
            <h2 className="text-xl font-semibold text-amber-100">Important disclaimer</h2>
            <p className="mt-2 text-sm leading-6 text-amber-50/90">
              Aura Revenue provides educational forecasting tools and examples only. Outputs are estimates based on user-provided assumptions and should not be treated as financial, legal, tax, accounting, or investment advice.
            </p>
          </section>

          <AdPlaceholder position="article-before-related" />

          <section className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">Related Guides</h2>
            <div className="mt-4 grid gap-3">
              {related.map((item) => item ? (
                <Link key={item.slug} href={`/learn/${item.slug}`} className="rounded-md border border-white/10 p-4 text-slate-200 hover:border-teal-300/40">
                  {item.title}
                </Link>
              ) : null)}
              <Link href="/methodology" className="rounded-md border border-white/10 p-4 text-slate-200 hover:border-teal-300/40">
                Aura Revenue Forecasting Methodology
              </Link>
            </div>
          </section>
          <AdPlaceholder position="article-bottom" />
        </article>
      </main>
    </PageShell>
  );
}
