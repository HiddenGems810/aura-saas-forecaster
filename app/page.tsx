import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  FileSpreadsheet,
  LineChart,
  ShieldCheck,
  Table2,
  TrendingDown,
} from 'lucide-react';
import { AdPlaceholder } from '@/components/site/ad-placeholder';
import { PageShell } from '@/components/site/page-shell';
import { SaasCalculator } from '@/components/site/saas-calculator';
import { getArticle, learnArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aura Revenue | SaaS MRR Forecasting Calculator',
  description: 'Forecast SaaS MRR, churn, ARR, and long-term recurring revenue with Aura Revenue educational SaaS growth tools and explainers.',
  openGraph: {
    title: 'Aura Revenue | SaaS MRR Forecasting Calculator',
    description: 'Forecast SaaS MRR, churn, ARR, and long-term recurring revenue with educational SaaS finance resources.',
    url: '/',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aura Revenue SaaS MRR forecasting calculator dashboard' }],
  },
};

const faq = [
  {
    q: 'What does Aura Revenue calculate?',
    a: 'Aura Revenue estimates future MRR, ARR run rate, churned MRR, and cumulative forecast revenue from the SaaS assumptions you enter. It uses a transparent monthly model, so you can see how growth and churn affect each period.',
  },
  {
    q: 'What inputs should I use if I am pre-revenue?',
    a: 'If you have no current MRR, use the calculator to test a future starting point instead of entering a made-up current number. For example, model what happens after you reach $1,000 or $5,000 MRR, then use the template to plan the path to that baseline.',
  },
  {
    q: 'Does this calculator account for expansion revenue?',
    a: 'The public calculator uses one monthly growth input. You can treat that input as a blended estimate of new MRR and expansion MRR. For a more detailed model, use the template and split new MRR, expansion MRR, contraction MRR, and churned MRR into separate columns.',
  },
  {
    q: 'What is the difference between ARR and ARR run rate?',
    a: 'ARR run rate annualizes the current monthly recurring revenue base by multiplying MRR by twelve. It does not guarantee that you will collect that amount over the next year. Churn, downgrades, expansion, payment failures, and new sales can all change the actual result.',
  },
  {
    q: 'Why does churn compound over time?',
    a: 'Churn lowers the revenue base that future growth builds on. A small monthly churn change can create a large difference over several years because every lost dollar stops contributing to later months.',
  },
  {
    q: 'Can I export the forecast?',
    a: 'Yes. Use the Copy CSV button inside the calculator to copy month-by-month forecast data. You can paste it into a spreadsheet and add operating details such as acquisition channels, pricing tiers, expansion revenue, or renewal timing.',
  },
  {
    q: 'How often should I update my SaaS forecast?',
    a: 'Update the forecast after each monthly close or whenever a major assumption changes. Growth rate, churn rate, pricing, acquisition volume, and expansion motion can shift quickly in an early SaaS business.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. Aura Revenue provides educational SaaS forecasting estimates only. Use it to understand assumptions and scenarios, then consult qualified professionals for financial, tax, legal, accounting, or investment decisions.',
  },
];

const valueStrip = [
  'Free SaaS forecasting tool',
  'Transparent formulas',
  'MRR, ARR, churn, and growth modeling',
  'Educational, not financial advice',
];

const heroCards = [
  { title: 'MRR projection', text: 'Estimate recurring revenue with growth and churn assumptions.', Icon: LineChart },
  { title: 'Churn impact', text: 'See how lost revenue changes the long-term curve.', Icon: TrendingDown },
  { title: 'Forecast education', text: 'Use formulas, examples, guides, and templates.', Icon: BookOpen },
];

const howItWorks = [
  ['1', 'Enter your current MRR', 'Start with your recurring revenue baseline. Annual contracts should be normalized into monthly recurring revenue.'],
  ['2', 'Set growth and churn assumptions', 'Model how new recurring revenue and lost recurring revenue change the curve over time.'],
  ['3', 'Review the forecast', 'Compare MRR, ARR run rate, churned MRR, cumulative revenue, and month-by-month output.'],
];

const formulas = [
  ['New MRR', 'Starting MRR x Monthly Growth Rate'],
  ['Churned MRR', 'Starting MRR x Monthly Churn Rate'],
  ['Ending MRR', 'Starting MRR + New MRR - Churned MRR'],
  ['ARR Run Rate', 'Ending MRR x 12'],
];

const scenarios = [
  ['Conservative', '3.0%', '2.5%', '$10,617', '$127,404'],
  ['Base', '7.0%', '2.0%', '$17,959', '$215,508'],
  ['Aggressive', '12.0%', '1.5%', '$33,113', '$397,356'],
];

const mistakes = [
  'Ignoring churn when projecting long-term MRR.',
  'Treating ARR run rate as guaranteed future revenue.',
  'Assuming growth stays constant without an acquisition plan.',
  'Forgetting expansion, contraction, refunds, and payment failures.',
  'Using benchmark ranges without checking company stage and pricing model.',
];

const glossary = [
  ['MRR', 'Monthly recurring revenue from active subscriptions.'],
  ['ARR run rate', 'Current MRR annualized by multiplying by twelve.'],
  ['Churned MRR', 'Recurring revenue lost from cancellations or downgrades.'],
  ['Net new MRR', 'New MRR plus expansion MRR minus contraction and churned MRR.'],
];

const modelExclusions = [
  'Seasonal demand changes',
  'Refunds and failed payments',
  'Enterprise contract timing',
  'Expansion revenue unless added through the growth assumption',
  'Taxes, payment processor fees, and one-time implementation revenue',
];

const guideIcons = [LineChart, Calendar, TrendingDown, CircleDollarSign, BarChart3, ShieldCheck, BookOpen, Table2, FileSpreadsheet];

export default function Home() {
  const featured = getArticle('what-is-mrr') ?? learnArticles[0];
  const featuredGuideSlugs = [
    'churn-rate',
    'saas-growth-model',
    'saas-cac-payback',
    'gross-revenue-retention-vs-net-revenue-retention',
    'saas-burn-multiple',
    'mrr-forecasting-bootstrapped-saas-founders',
  ];
  const remainingGuides = featuredGuideSlugs
    .map(getArticle)
    .filter((article): article is NonNullable<typeof article> => Boolean(article));

  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">SaaS finance education and tools</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
              SaaS MRR forecasting for growth, churn, and ARR planning
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-300">
              Aura Revenue helps founders and operators model recurring revenue scenarios, understand churn impact, compare MRR and ARR, and build transparent SaaS forecasts.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Use it to understand how growth, churn, and ARR run rate interact before building a more advanced financial model.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/calculator" className="inline-flex items-center gap-2 rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">
                Open calculator <ArrowRight size={16} />
              </Link>
              <Link href="/learn/saas-growth-model" className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Learn forecasting
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {valueStrip.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md border border-teal-300/15 bg-teal-300/[0.06] px-3 py-2 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-teal-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {heroCards.map(({ title, text, Icon }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-[#11191b] p-6 shadow-xl shadow-black/15">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-teal-300/20 bg-teal-300/[0.08] p-3 text-teal-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{title}</p>
                    <p className="mt-2 text-base leading-7 text-slate-300">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <AdPlaceholder position="home-after-intro" />
        </div>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-white">A simple workflow for SaaS forecasting</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {howItWorks.map(([number, title, text]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-300 text-sm font-bold text-slate-950">{number}</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SaasCalculator showIntro />
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="min-w-0 rounded-lg border border-white/10 bg-[#11191b] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Methodology snapshot</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Core forecast formulas</h2>
            <div className="mt-6 grid gap-3">
              {formulas.map(([label, formula]) => (
                <div key={label} className="min-w-0 rounded-md border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 break-words font-mono text-base text-teal-200">{formula}</p>
                </div>
              ))}
            </div>
            <Link href="/methodology" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">
              Read full methodology <ArrowRight size={16} />
            </Link>
          </div>
          <div className="min-w-0 rounded-lg border border-white/10 bg-[#11191b] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Example forecast scenarios</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Compare assumption ranges</h2>
            <div className="mt-6 max-w-full overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/[0.04] text-left text-slate-400">
                  <tr>
                    <th className="px-4 py-4">Scenario</th>
                    <th className="px-4 py-4 text-right">Growth</th>
                    <th className="px-4 py-4 text-right">Churn</th>
                    <th className="px-4 py-4 text-right">Month 12 MRR</th>
                    <th className="px-4 py-4 text-right">ARR run rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-300">
                  {scenarios.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={cell} className={`px-4 py-4 ${index === 0 ? 'font-semibold text-white' : 'text-right font-mono tabular-nums'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">Scenario values assume $10,000 starting MRR and a 12-month period.</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Worked example</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Interpreting the default forecast</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              If a company starts at $10,000 MRR, grows 8.5% monthly, and loses 2.1% to churn, the model estimates $413,521 MRR by month 60 and $6,708,538 in cumulative forecast revenue. This is not a guarantee. It shows how compounding growth can change long-term projections when assumptions stay constant.
            </p>
          </div>
          <div className="rounded-lg border border-amber-300/25 bg-amber-300/[0.08] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">Model limits</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">What this model does not include</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-amber-50/90">
              {modelExclusions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-amber-200">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold text-white">Common SaaS forecasting mistakes</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-300">
              {mistakes.map((mistake) => (
                <li key={mistake} className="flex gap-3">
                  <TrendingDown size={17} className="mt-1 shrink-0 text-rose-300" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Free SaaS forecast template</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Copy a month-by-month forecast structure</h2>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Track starting MRR, new MRR, expansion MRR, churned MRR, ending MRR, and ARR run rate in a spreadsheet-friendly format.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/templates/saas-revenue-forecast" className="rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">
                Open template
              </Link>
              <Link href="/calculator" className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Copy CSV from calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="self-start rounded-lg border border-teal-300/20 bg-[#11191b] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Featured guide</p>
              <h2 className="mt-3 text-2xl font-bold text-white">{featured.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Start here if you are new to recurring revenue forecasting. Learn how MRR is calculated, what changes it, and how it connects to ARR, churn, and growth planning.
              </p>
              <p className="mt-4 text-sm text-slate-500">Estimated read time: 6 minutes</p>
              <div className="mt-5 rounded-md border border-white/10 bg-slate-950/35 p-4">
                <p className="text-sm font-semibold text-white">You will learn:</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                  <li>How to calculate MRR.</li>
                  <li>What changes MRR month to month.</li>
                  <li>How MRR connects to ARR, churn, and growth forecasts.</li>
                </ul>
              </div>
              <Link href={`/learn/${featured.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">
                Read the MRR guide <ArrowRight size={16} />
              </Link>
            </div>
            <div>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Learn SaaS finance</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Build a cleaner forecast</h2>
                </div>
                <Link href="/learn" className="hidden text-sm font-semibold text-teal-300 hover:text-teal-200 sm:block">View all articles</Link>
              </div>
              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Start here</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ['Learn MRR', '/learn/what-is-mrr'],
                    ['Understand churn', '/learn/churn-rate'],
                    ['Build a forecast', '/learn/saas-growth-model'],
                    ['Use the template', '/templates/saas-revenue-forecast'],
                  ].map(([label, href], index) => (
                    <Link key={label} href={href} className="rounded-md border border-white/10 bg-slate-950/35 p-4 text-sm font-semibold text-white hover:border-teal-300/40">
                      <span className="text-teal-300">{index + 1}.</span> {label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {remainingGuides.map((article, index) => {
                  const Icon = guideIcons[index % guideIcons.length];
                  return (
                    <Link key={article.slug} href={`/learn/${article.slug}`} className="group cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/[0.07]">
                      <Icon size={20} className="text-teal-300" />
                      <h3 className="mt-4 text-lg font-semibold text-white">{article.title}</h3>
                      <p className="mt-3 text-base leading-7 text-slate-300">{article.description}</p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-slate-500">6 min read</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-300">
                        Read guide <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-[#11191b] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">SaaS forecasting glossary</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Terms used in the calculator</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {glossary.map(([term, definition]) => (
                <div key={term} className="rounded-md border border-white/10 bg-slate-950/35 p-4">
                  <h3 className="font-semibold text-white">{term}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-300">{definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Forecasting questions founders ask</h2>
            </div>
            <p className="text-sm text-slate-500">Content reviewed and updated: April 2026</p>
          </div>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer text-base font-semibold text-white">{item.q}</summary>
                <p className="mt-3 text-base leading-7 text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-amber-300/25 bg-amber-300/[0.08] p-5 text-sm leading-6 text-amber-50">
            Aura Revenue provides educational SaaS forecasting estimates only. Results are based on the assumptions entered and should not be treated as financial, investment, tax, or legal advice.
          </p>
          <p className="sr-only">Canonical URL: {SITE_URL}</p>
        </section>
      </main>
    </PageShell>
  );
}
