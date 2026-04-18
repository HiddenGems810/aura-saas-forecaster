'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useForecaster } from '@/hooks/use-forecaster';
import {
  AreaChart, Area, Tooltip, ResponsiveContainer, ReferenceLine, XAxis,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedCounter }    from '@/components/animated-counter';
import { ProjectionInsights } from '@/components/projection-insights';
import { SliderWithTooltip }  from '@/components/slider-with-tooltip';
import { GoldenCrossLabel }   from '@/components/golden-cross-dot';
import {
  Share2, ChevronDown, ChevronUp, Copy, Check,
  Download, BarChart2, FileText, ShieldCheck,
  TrendingDown, Calculator, TrendingUp, Award,
} from 'lucide-react';
import { toPng } from 'html-to-image';

// ─── Churn Sweet-Spot Zone Config ────────────────────────────────────────────
const CHURN_ZONES = [
  { min: 0,  max: 2,  color: '#4ade80', label: 'Sweet'   },
  { min: 2,  max: 5,  color: '#facc15', label: 'Caution' },
  { min: 5,  max: 20, color: '#f87171', label: 'Danger'  },
];

// ─── URL Param Validation ─────────────────────────────────────────────────────
const PARAM_BOUNDS = {
  mrr:    { min: 0,  max: 100_000, default: 10_000, step: 1_000 },
  growth: { min: 0,  max: 50,      default: 8.5,    step: 0.1   },
  churn:  { min: 0,  max: 20,      default: 2.1,    step: 0.1   },
  months: { min: 12, max: 120,     default: 60,     step: 12    },
} as const;

function parseUrlParam(params: URLSearchParams, key: keyof typeof PARAM_BOUNDS): number {
  const raw = params.get(key);
  if (!raw) return PARAM_BOUNDS[key].default;
  if (raw.length > 20 || !/^-?\d+(\.\d+)?$/.test(raw)) return PARAM_BOUNDS[key].default;
  const num = Number(raw);
  const { min, max, step, default: def } = PARAM_BOUNDS[key];
  if (!isFinite(num) || isNaN(num) || num < min || num > max) return def;
  return Math.min(max, Math.max(min, Math.round(num / step) * step));
}

// ─── Internal House-Ad Resource Definitions ───────────────────────────────────
// These replace empty ghost placeholders with real navigable content, satisfying
// Google AdSense's "substantial value" and "meaningful content" review criteria.
const HOUSE_ADS = [
  {
    id:     'mastering-churn',
    href:   '#saas-velocity',
    Icon:   TrendingDown,
    eyebrow:'Deep Dive',
    title:  'Mastering Churn',
    desc:   'Why cutting churn 1% outperforms adding 5% growth over any 60-month horizon.',
    cta:    'Read the analysis',
    accent: '#4ade80',
  },
  {
    id:     'wealth-formula',
    href:   '#math-behind-aura',
    Icon:   Calculator,
    eyebrow:'Core Concept',
    title:  'The Wealth Formula',
    desc:   'The recursive MRR equation powering every projection in this dashboard.',
    cta:    'Explore the formula',
    accent: '#d4af37',
  },
  {
    id:     'strategic-growth',
    href:   '#improve-outlook',
    Icon:   TrendingUp,
    eyebrow:'Founder Playbook',
    title:  'Strategic Growth',
    desc:   'Four levers—NRR, annual contracts, value pricing, and time—that compound your outlook.',
    cta:    'Apply the playbook',
    accent: '#60a5fa',
  },
  {
    id:     'premium-reporting',
    href:   '#download-pdf',
    Icon:   Award,
    eyebrow:'Export Feature',
    title:  'Premium Reporting',
    desc:   'Download a boardroom-ready PDF of your full projection with milestones included.',
    cta:    'Generate your report',
    accent: '#c084fc',
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [startMrr,      setStartMrr]      = useState<number>(10_000);
  const [growthRate,    setGrowthRate]    = useState<number>(8.5);
  const [churnRate,     setChurnRate]     = useState<number>(2.1);
  const [months,        setMonths]        = useState<number>(60);
  const [showTable,     setShowTable]     = useState<boolean>(false);
  const [isCopied,      setIsCopied]      = useState<boolean>(false);
  const [pulseShare,    setPulseShare]    = useState<boolean>(false);
  const [showBenchmark, setShowBenchmark] = useState<boolean>(false);
  const [showFlexCard,  setShowFlexCard]  = useState<boolean>(false);
  const [shimmerKey,    setShimmerKey]    = useState<number>(0);

  const prevMilestoneRef = useRef<string | null>(null);
  const chartRef         = useRef<HTMLDivElement>(null);

  // Init from URL
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setStartMrr(parseUrlParam(p, 'mrr'));
    setGrowthRate(parseUrlParam(p, 'growth'));
    setChurnRate(parseUrlParam(p, 'churn'));
    setMonths(parseUrlParam(p, 'months'));
  }, []);

  // Sync to URL
  useEffect(() => {
    const p = new URLSearchParams();
    p.set('mrr',    startMrr.toString());
    p.set('growth', growthRate.toString());
    p.set('churn',  churnRate.toString());
    p.set('months', months.toString());
    window.history.replaceState(null, '', `?${p.toString()}`);
  }, [startMrr, growthRate, churnRate, months]);

  // Forecaster — memoized inside hook
  const rawProjectionData = useForecaster(startMrr, growthRate, churnRate, months);
  const benchmarkDataRaw  = useForecaster(startMrr, 3, 5, months);

  const projectionData = useMemo(() =>
    rawProjectionData.map((d, i) => ({
      ...d,
      benchmarkCumulative: benchmarkDataRaw[i]?.cumulativeTotal ?? 0,
      benchmarkRevenue:    benchmarkDataRaw[i]?.revenue          ?? 0,
    })),
  [rawProjectionData, benchmarkDataRaw]);

  const finalCumulative = projectionData.at(-1)?.cumulativeTotal ?? 0;
  const year1Rev        = projectionData[Math.min(11, projectionData.length - 1)]?.cumulativeTotal ?? 0;
  const finalMrr        = projectionData.at(-1)?.revenue ?? 0;
  const netYield        = startMrr > 0 ? ((finalMrr - startMrr) / startMrr) * 100 : 0;

  const goldenCrossMonth = useMemo(() =>
    projectionData.find((d) => d.cumulativeTotal >= 1_000_000)?.month ?? null,
  [projectionData]);

  // Milestone shimmer
  useEffect(() => {
    const tier =
      finalCumulative >= 50_000_000 ? '50M' :
      finalCumulative >= 10_000_000 ? '10M' :
      finalCumulative >= 1_000_000  ? '1M'  : null;
    if (tier && tier !== prevMilestoneRef.current) {
      prevMilestoneRef.current = tier;
      setShimmerKey((k) => k + 1);
    } else if (!tier) {
      prevMilestoneRef.current = null;
    }
  }, [finalCumulative]);

  // Overflow-safe formatter — Intl.NumberFormat breaks silently above ~1e21
  const formatCurrency = useCallback((value: number): string => {
    if (!isFinite(value) || isNaN(value)) return '$—';
    const abs = Math.abs(value);
    if (abs >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (abs >= 1e9)  return `$${(value / 1e9).toFixed(2)}B`;
    if (abs >= 1e6)  return `$${(value / 1e6).toFixed(2)}M`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }, []);

  const formatPercent = useCallback((v: number) => `${v.toFixed(1)}%`, []);
  const formatMrr     = useCallback((v: number) => `$${(v / 1000).toFixed(0)}k`, []);
  const formatMonths  = useCallback((v: number) => `${v}mo`, []);

  // Share pulse
  useEffect(() => {
    const t = setTimeout(() => setPulseShare(true), 30_000);
    return () => clearTimeout(t);
  }, []);

  const handleShare = () => {
    setPulseShare(false);
    navigator.clipboard.writeText(
      `📈 I just projected a ${formatCurrency(finalCumulative)} outlook for my SaaS using Aura.\n\n${window.location.href}`
    ).then(() => { setShowFlexCard(true); setTimeout(() => setShowFlexCard(false), 3_500); });
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(
      `📈 I just projected a ${formatCurrency(finalCumulative)} outlook for my SaaS using Aura.\n\n${window.location.href}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2_000);
  };

  const handleDownloadImage = async () => {
    if (!chartRef.current) return;
    try {
      const url = await toPng(chartRef.current, { cacheBust: true, style: { background: '#050507' }, pixelRatio: 2, fontEmbedCSS: '' });
      Object.assign(document.createElement('a'), { download: 'aura-projection-snapshot.png', href: url }).click();
    } catch { /* non-critical */ }
  };

  const churnColor = churnRate < 2 ? '#4ade80' : churnRate < 5 ? '#facc15' : '#f87171';

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full min-h-screen relative overflow-x-hidden pt-8">

      {/* Share Toast */}
      <AnimatePresence>
        {showFlexCard && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-[var(--accent-color)]/50 bg-[#141419]/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(212,175,55,0.35)] no-print"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--accent-color)]/20 border border-[var(--accent-color)]/40 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-[var(--accent-color)]" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white tracking-wide">Link copied to clipboard!</p>
              <p className="text-[10px] text-[var(--accent-color)] uppercase tracking-[1.5px] mt-0.5">Ready to flex. 💪</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header — luxury minimal; version string lives in footer ─────── */}
      <header className="px-6 md:px-12 flex justify-between items-center w-full max-w-7xl mx-auto z-10">
        <a href="/" aria-label="Aura — SaaS Wealth Forecaster"
          className="text-[24px] font-bold tracking-[4px] uppercase text-[var(--accent-color)] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] select-none hover:opacity-80 transition-opacity">
          Aura
        </a>
        <button id="btn-share" onClick={handleShare} aria-label="Copy shareable projection link"
          className={`flex items-center gap-2 px-4 py-2 text-[12px] uppercase font-bold tracking-[1.5px] rounded-full border border-[var(--border-color)] text-[var(--accent-color)] bg-[var(--card-bg)] hover:bg-[var(--accent-color)] hover:text-black transition-all shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] backdrop-blur-md ${pulseShare ? 'animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.7)] border-[var(--accent-color)]' : ''}`}>
          <Share2 size={14} /><span>Flex</span>
        </button>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.25 } } }}
        initial="hidden" animate="show"
        className="flex flex-col max-w-7xl mx-auto w-full px-6 md:px-12 mt-8 flex-grow z-10">

        <main className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start w-full">

          {/* Controls */}
          <motion.section layout
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
            className="bg-[var(--card-bg)] backdrop-blur-[20px] border border-[var(--border-color)] rounded-[16px] p-6 flex flex-col shadow-2xl no-print">
            <h2 className="text-[14px] font-semibold tracking-[1.5px] uppercase text-[var(--text-secondary)] mb-6 border-b border-[var(--border-color)] pb-3">Logic Controller</h2>

            {[
              { id: 'startMrr', label: 'Start MRR ($)', value: startMrr, set: setStartMrr, bounds: PARAM_BOUNDS.mrr, fmt: formatMrr, display: formatCurrency(startMrr) },
              { id: 'growthRate', label: 'Monthly Growth (%)', value: growthRate, set: setGrowthRate, bounds: PARAM_BOUNDS.growth, fmt: formatPercent, display: `${growthRate}%`, color: 'var(--accent-color)' },
            ].map(({ id, label, value, set, bounds, fmt, display, color }) => (
              <div key={id} className="mb-7">
                <div className="flex justify-between mb-3">
                  <label htmlFor={id} className="text-[13px] uppercase tracking-wider font-bold text-[var(--text-secondary)]">{label}</label>
                  <span className="font-mono text-[15px] font-bold tabular-nums" style={{ color: color || 'var(--accent-color)' }}>{display}</span>
                </div>
                <SliderWithTooltip id={id} min={bounds.min} max={bounds.max} step={bounds.step} value={value} onChange={set} formatTooltip={fmt} />
              </div>
            ))}

            {/* Churn — has colour + zones */}
            <div className="mb-7">
              <div className="flex justify-between mb-3">
                <label htmlFor="churnRate" className="text-[13px] uppercase tracking-wider font-bold text-[var(--text-secondary)]">Monthly Churn (%)</label>
                <span className="font-mono text-[15px] font-bold transition-colors duration-300 tabular-nums" style={{ color: churnColor }}>{churnRate}%</span>
              </div>
              <SliderWithTooltip id="churnRate" min={PARAM_BOUNDS.churn.min} max={PARAM_BOUNDS.churn.max} step={PARAM_BOUNDS.churn.step} value={churnRate} onChange={setChurnRate} zones={CHURN_ZONES} formatTooltip={formatPercent} />
            </div>

            {/* Horizon */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label htmlFor="months" className="text-[13px] uppercase tracking-wider font-bold text-[var(--text-secondary)]">Projection Horizon</label>
                <span className="font-mono text-[15px] font-bold text-[var(--accent-color)] tabular-nums">{months} Months</span>
              </div>
              <SliderWithTooltip id="months" min={PARAM_BOUNDS.months.min} max={PARAM_BOUNDS.months.max} step={PARAM_BOUNDS.months.step} value={months} onChange={setMonths} formatTooltip={formatMonths} />
            </div>

            {/* Stats */}
            <div className="mt-auto p-4 bg-black/40 rounded-lg border border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[1.5px] font-semibold text-[var(--text-secondary)] mb-2">Year 1 Rev</div>
                  <div className="font-mono text-base font-bold tabular-nums">{formatCurrency(year1Rev)}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[1.5px] font-semibold text-[var(--text-secondary)] mb-2">Net Yield</div>
                  <div className="font-mono text-base font-bold text-[#4ade80] tabular-nums">+{netYield.toFixed(1)}%</div>
                </div>
              </div>
              {goldenCrossMonth && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="text-[11px] uppercase tracking-[1.5px] font-semibold text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    7-Figure Milestone
                  </div>
                  <div className="font-mono text-base font-bold text-[var(--accent-color)] tabular-nums">Month {goldenCrossMonth}</div>
                </div>
              )}
            </div>
          </motion.section>

          {/* Right Column */}
          <motion.section layout className="flex flex-col gap-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.05)]">
            <div ref={chartRef} className="flex flex-col gap-6 p-2 -m-2 bg-[var(--bg-color)] sm:bg-transparent">

              {/* Hero Metric */}
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
                className="bg-[var(--card-bg)] backdrop-blur-[20px] border border-[var(--border-color)] rounded-[16px] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-color)] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <h2 className="text-[14px] font-semibold tracking-[2px] uppercase text-[var(--text-secondary)] mb-4 z-10">Total {months}-Month Outlook</h2>
                <AnimatedCounter key={shimmerKey} value={finalCumulative} format={formatCurrency}
                  className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter drop-shadow-2xl z-10 bg-gradient-to-br from-white via-[#f0f0f5] to-neutral-400 text-transparent bg-clip-text tabular-nums${shimmerKey > 0 ? ' milestone-shimmer' : ''}`} />

                <div className="mt-6 z-10 flex flex-wrap justify-center items-center gap-3 no-print">
                  <button id="btn-copy-snippet" onClick={handleCopySummary}
                    className="flex items-center gap-2 text-[11px] uppercase font-semibold tracking-[1px] bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-colors border border-white/10 text-[var(--text-secondary)] hover:text-white">
                    {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{isCopied ? 'Summary Copied!' : 'Copy Snippet'}</span>
                  </button>
                  <button id="btn-save-image" onClick={handleDownloadImage}
                    className="flex items-center gap-2 text-[11px] uppercase font-semibold tracking-[1px] bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 px-5 py-2.5 rounded-full transition-colors border border-[var(--accent-color)]/30 text-[var(--accent-color)]">
                    <Download size={14} /><span>Save Image</span>
                  </button>
                  <button id="btn-print-pdf" onClick={() => window.print()}
                    className="flex items-center gap-2 text-[11px] uppercase font-semibold tracking-[1px] bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-colors border border-white/10 text-[var(--text-secondary)] hover:text-white">
                    <FileText size={14} /><span>Download PDF</span>
                  </button>
                </div>
              </motion.div>

              {/* Print-only scenario summary */}
              <div className="hidden print:block border border-gray-200 rounded-xl p-6 mb-2 bg-white text-black">
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-gray-500 mb-4 border-b border-gray-100 pb-2">Scenario Parameters</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    ['Starting MRR',  formatCurrency(startMrr)],
                    ['Monthly Growth',`${growthRate}%`],
                    ['Monthly Churn', `${churnRate}%`],
                    ['Horizon',       `${months} Months`],
                    ['Year 1 Revenue',formatCurrency(year1Rev)],
                    ['Net MRR Yield', `+${netYield.toFixed(1)}%`],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span className="text-gray-400 text-[10px] uppercase tracking-widest block">{label}</span>
                      <span className="font-mono font-bold text-black tabular-nums">{val}</span>
                    </div>
                  ))}
                  {goldenCrossMonth && (
                    <div className="col-span-2 pt-2 border-t border-gray-100">
                      <span className="text-gray-400 text-[10px] uppercase tracking-widest block">7-Figure Milestone</span>
                      <span className="font-mono font-bold text-black tabular-nums">Month {goldenCrossMonth}</span>
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-gray-400 mt-4">
                  Generated by Aura SaaS Insights · aura-insights.com · For planning purposes only. Not financial advice.
                </p>
              </div>

              {/* Wealth Trajectory Chart */}
              <motion.div layout
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
                className="bg-[var(--card-bg)] backdrop-blur-[20px] border border-[var(--border-color)] rounded-[16px] p-6 shadow-2xl relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-semibold tracking-[1.5px] uppercase text-[var(--text-secondary)] border-l-2 border-[var(--accent-color)] pl-3">Wealth Trajectory</h3>
                  <button id="btn-toggle-benchmark" onClick={() => setShowBenchmark(!showBenchmark)}
                    className={`flex items-center gap-2 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${showBenchmark ? 'border-white/40 text-white bg-white/10' : 'border-white/10 text-[var(--text-secondary)] hover:bg-white/5'}`}>
                    <BarChart2 size={12} />{showBenchmark ? 'Hide Benchmark' : 'Industry Avg'}
                  </button>
                </div>

                <div className="w-full" style={{ aspectRatio: '16/9', maxHeight: '440px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="var(--accent-color)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" hide />
                      <Tooltip cursor={{ stroke: 'var(--border-color)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        content={(props) => {
                          if (!props.active || !props.payload?.length) return null;
                          const d = props.payload[0].payload;
                          return (
                            <div className="bg-[#141419]/90 backdrop-blur-xl border border-[var(--border-color)] p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)]">
                              <p className="text-[10px] uppercase tracking-[1.5px] text-[var(--text-secondary)] mb-2">Month {d.month}</p>
                              <span className="text-[var(--accent-color)] text-[10px] uppercase tracking-wide block mb-0.5">Your Cumulative</span>
                              <span className="font-mono text-white text-lg font-bold tabular-nums">{formatCurrency(d.cumulativeTotal)}</span>
                              {showBenchmark && (<>
                                <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wide block mt-2 mb-0.5">Industry Avg</span>
                                <span className="font-mono text-[var(--text-secondary)] text-sm opacity-60 tabular-nums">{formatCurrency(d.benchmarkCumulative)}</span>
                              </>)}
                            </div>
                          );
                        }}
                      />
                      {showBenchmark && <Area type="monotone" dataKey="benchmarkCumulative" stroke="rgba(255,255,255,0.25)" strokeWidth={2} strokeDasharray="5 4" fill="transparent" isAnimationActive={false} />}
                      {goldenCrossMonth && <ReferenceLine x={goldenCrossMonth} stroke="rgba(212,175,55,0.5)" strokeWidth={1.5} strokeDasharray="4 3" label={<GoldenCrossLabel />} />}
                      <Area type="monotone" dataKey="cumulativeTotal" stroke="var(--accent-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" animationDuration={1500} animationEasing="ease-out" activeDot={{ r: 6, fill: 'var(--accent-color)', stroke: '#141419', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {showBenchmark && (
                  <div className="mt-4 flex items-center gap-4 text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><span className="w-4 h-[2px] bg-[var(--accent-color)] inline-block rounded" />Your Projection</span>
                    <span className="flex items-center gap-1.5"><span className="w-4 h-0 inline-block border-t-2 border-dashed border-white/30" />Industry Avg</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Raw Data Table */}
            <motion.div layout className="bg-[var(--card-bg)] backdrop-blur-[20px] border border-[var(--border-color)] rounded-[16px] overflow-hidden shadow-2xl">
              <button id="btn-toggle-table" onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors focus:outline-none">
                <h2 className="text-[14px] font-semibold tracking-[1.5px] uppercase text-[var(--text-secondary)]">Raw Data Details</h2>
                <div className="text-[var(--accent-color)]">{showTable ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
              </button>
              <AnimatePresence>
                {showTable && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="px-6 pb-6 overflow-hidden">
                    <div className="overflow-x-auto max-h-[400px] border border-white/10 rounded-xl rounded-t-none border-t-0 p-1 custom-scrollbar">
                      <table className="w-full text-left text-[13px] border-collapse min-w-[300px]">
                        <thead className="sticky top-0 bg-[#16161c] z-10 shadow-md">
                          <tr>
                            {['Month','Revenue ($)','Cumulative Total'].map((h, i) => (
                              <th key={h} className={`p-3 text-[var(--text-secondary)] font-medium border-b border-white/10${i > 0 ? ' text-right' : ''}`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {projectionData.map((d) => (
                            <tr key={d.month} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5 px-3 border-b border-white/5 font-mono text-[var(--text-secondary)] tabular-nums">Month {d.month}</td>
                              <td className="py-2.5 px-3 border-b border-white/5 text-right font-mono text-[var(--text-primary)] tabular-nums">{formatCurrency(d.revenue)}</td>
                              <td className="py-2.5 px-3 border-b border-white/5 text-right font-mono text-[var(--accent-color)] tabular-nums">{formatCurrency(d.cumulativeTotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Leaderboard Ad Slot — ghost placeholder, replaced by AdSense on approval */}
            <div className="w-full mt-4 flex justify-center no-print" aria-label="Advertisement">
              <div className="ad-slot-leaderboard w-full max-w-[728px] rounded-2xl bg-gradient-to-r from-[#141419]/80 via-[#1a1a24]/80 to-[#141419]/80 backdrop-blur-xl border border-[var(--border-color)]/30 overflow-hidden relative flex items-center justify-center">
                <span className="text-[9px] uppercase tracking-[4px] text-[var(--accent-color)] font-bold opacity-30 select-none pointer-events-none">
                  Aura Partner Network
                </span>
              </div>
            </div>

            {/* Strategy Insights */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }} className="mt-12 py-6 print-center-block">
              <ProjectionInsights churnRate={churnRate} growthRate={growthRate} months={months} />
            </motion.div>
          </motion.section>
        </main>

        {/* ── Long-Form Content ───────────────────────────────────────────── */}
        <section className="mt-20 max-w-3xl mx-auto w-full text-[var(--text-secondary)]">
          <article className="prose prose-invert prose-lg prose-headings:text-[var(--text-primary)] prose-a:text-[var(--accent-color)] opacity-90 leading-relaxed font-sans editorial-prose print-center-block">

            <h2 id="saas-velocity" className="text-3xl font-bold tracking-tight mb-6">Understanding Your SaaS Velocity</h2>
            <p className="mb-6">SaaS businesses scale fundamentally differently from traditional retail or service models. The defining advantage is <strong className="text-white font-semibold">subscription compounding</strong>—every new customer you acquire doesn&apos;t just contribute a single transaction; it permanently layers a new revenue stream on top of all existing ones. Month after month, that stack grows taller.</p>
            <p className="mb-6">This is why Monthly Recurring Revenue (MRR) is the single most important metric in any SaaS business. It isn&apos;t simply &quot;revenue&quot;—it is a velocity indicator. A business at $10,000 MRR growing at 8% monthly is building compounding momentum that accelerates faster the longer it is sustained. By month 36, that $10K baseline reaches over $100K MRR. By month 60, it surpasses $320K monthly—a 32× multiplier from the starting point.</p>
            <p className="mb-10">Churn acts as a constant drag coefficient on your compounding engine. Even a 3% monthly churn rate means you are losing over one-third of your customer base annually. When layered against modest growth rates, your trajectory flattens into stagnation. Aura models the <em>net</em> growth factor—growth minus churn—rather than gross acquisition alone. The curve is the honest picture.</p>

            {/* In-article house ad: The Wealth Formula */}
            <a href="#math-behind-aura" aria-label="Read: The Wealth Formula"
              className="my-12 flex items-center gap-5 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl no-underline group hover:border-[var(--accent-color)]/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_32px_rgba(212,175,55,0.15)] no-print"
              style={{ display: 'flex' }}>
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center group-hover:bg-[var(--accent-color)]/20 transition-colors">
                <Calculator size={20} className="text-[var(--accent-color)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-[3px] text-[var(--accent-color)] font-bold mb-0.5 opacity-70">Core Concept</p>
                <p className="text-[14px] font-bold text-white mb-0.5">The Wealth Formula</p>
                <p className="text-[12px] text-[var(--text-secondary)] leading-snug">The recursive MRR equation powering every projection in this dashboard.</p>
              </div>
              <span className="flex-shrink-0 text-[10px] uppercase tracking-widest text-[var(--accent-color)] opacity-50 group-hover:opacity-100 transition-opacity pr-1">Read →</span>
            </a>

            <h2 id="math-behind-aura" className="text-2xl font-bold tracking-tight mt-12 mb-6">The Math Behind Aura</h2>
            <p className="mb-4">The projection engine applies a recursive formula monthly, evaluating your compounding limit through this core SaaS equation:</p>
            <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-8 text-center font-mono text-lg text-[var(--accent-color)] shadow-inner relative print-center-block">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-xl text-[var(--accent-color)] rounded-full text-[9px] font-bold tracking-[2px] uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <ShieldCheck size={12} /> Verified Formula
              </span>
              {`MRR_n = MRR_(n-1) × (1 + g/100 − c/100)`}
            </div>
            <ul className="space-y-3 mb-6 list-disc pl-6">
              <li><strong className="text-white">MRR<sub>n</sub></strong>: Projected Monthly Recurring Revenue at month <em>n</em>.</li>
              <li><strong className="text-white">g (Growth Rate)</strong>: Monthly velocity at which new recurring revenue is added, as a percentage.</li>
              <li><strong className="text-white">c (Churn Rate)</strong>: The attrition penalty—percentage of revenue lost each month to cancellations.</li>
            </ul>
            <p className="mb-10">Each month&apos;s output becomes the next month&apos;s input, creating the exponential curve. The cumulative total in the hero metric is the running sum of all monthly revenues—total cash received over the full window, not just the final month&apos;s annualized run rate. A business projecting $500K MRR at month 60 may have generated $8M+ in cumulative revenue—the true wealth-creation figure for planning purposes.</p>

            <h2 id="improve-outlook" className="text-2xl font-bold tracking-tight mt-12 mb-6">How to Improve Your Outlook</h2>
            <p className="mb-6">If your projection falls short of your financial independence target, the sliders reveal the precise levers available. Small, sustained improvements compound dramatically over 36–60 months.</p>
            <ol className="space-y-8 list-decimal pl-6 mb-10">
              <li>
                <strong className="text-white text-lg block mb-2">Achieve Negative Churn via Expansion Revenue</strong>
                <p>The most powerful unlock in SaaS is when existing customers spend more over time than new customers cancel—Net Revenue Retention (NRR) above 100%. Companies like Snowflake and Twilio have reported NRR above 130%, meaning their existing base alone grows revenue. Drag churn below 2% and growth above 10% to see how quickly this unlocks the 7-figure milestone.</p>
              </li>
              <li>
                <strong className="text-white text-lg block mb-2">Deploy Annual Contracts to Lock In LTV</strong>
                <p>Monthly subscribers churn at dramatically higher rates than annual subscribers—primarily due to buyer&apos;s remorse cancellations in months 1–3. Migrating 40% of your base to annual billing effectively cuts gross churn nearly in half, since annual customers are contractually retained for 12 months. Secondary benefit: 12 months of cash upfront.</p>
              </li>
              <li>
                <strong className="text-white text-lg block mb-2">Optimize Value-Based Pricing Before Scaling Acquisition</strong>
                <p>Most founders undercharge by 20–40% relative to the value they deliver. Raising prices 15% on new customers increases MRR immediately with zero additional acquisition cost. For a business at $20K MRR, a 15% increase adds $3K MRR in month one—equivalent to 10–15 new customers at typical conversion rates. That increment compounds at the same rate as your entire base.</p>
              </li>
              <li>
                <strong className="text-white text-lg block mb-2">Extend Your Horizon — Time Is the Silent Multiplier</strong>
                <p>Move the Projection Horizon slider from 36 to 60 months and observe the step-change in cumulative revenue. The final 24 months of a 60-month projection often contain more cumulative revenue than the first 36 combined, because compounding has had time to accelerate. A business at 2% churn over 60 months dramatically outperforms one at 5% churn despite identical gross growth rates.</p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight mt-12 mb-6">SaaS Industry Benchmarks &amp; What They Mean For You</h2>
            <p className="mb-6">The &quot;Industry Avg&quot; toggle overlays a benchmark of 3% monthly growth and 5% monthly churn—derived from published SaaS data across early-stage B2B companies. This represents a <em>median</em> trajectory, not best-in-class. Understanding where you sit relative to this baseline is critical context for planning.</p>
            <p className="mb-6">Top-quartile SaaS companies maintain monthly churn below 1% and net growth rates above 12%. If your curve significantly outpaces the benchmark overlay, your inputs may reflect aspirational targets—use the tool to model both your current baseline and target state to understand the realistic gap.</p>
            <p className="mb-10">The 7-Figure Milestone marker identifies the specific month your cumulative revenue crosses $1,000,000. For most early-stage founders starting at $5,000–$15,000 MRR with modest growth, this milestone falls between months 18 and 36. Founders who have already crossed it can use Aura to model their path to $10M and $50M cumulative—each represented by the milestone shimmer in the hero metric.</p>
          </article>
        </section>

        {/* ── House Ad Grid — 4 internal resource cards ──────────────────── */}
        <div id="download-pdf" className="w-full mt-24 mb-10 no-print">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--border-color)]" />
            <h3 className="text-[10px] uppercase tracking-[4px] text-[var(--accent-color)] font-bold opacity-70 whitespace-nowrap px-2">
              Aura Resources
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--border-color)]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOUSE_ADS.map(({ id, href, Icon, eyebrow, title, desc, cta, accent }) => (
              <a key={id} href={href} aria-label={`Read: ${title}`}
                className="house-ad-card relative flex flex-col gap-3 rounded-[16px] p-5 bg-[var(--card-bg)] backdrop-blur-[20px] border border-[var(--border-color)] hover:border-[var(--accent-color)]/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 no-underline group">
                <div className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${accent}08, transparent 70%)` }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 flex-shrink-0"
                  style={{ backgroundColor: `${accent}12`, borderColor: `${accent}30` }}>
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-[9px] uppercase tracking-[2.5px] font-bold opacity-50" style={{ color: accent }}>{eyebrow}</p>
                  <p className="text-[13px] font-bold text-white leading-tight">{title}</p>
                  <p className="text-[11.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{desc}</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mt-auto opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: accent }}>
                  {cta} →
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Print version of house ads */}
        <div className="hidden print:block mt-8 mb-4">
          <h3 className="text-[10px] uppercase tracking-[3px] text-gray-500 font-bold mb-3">Further Reading</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
            {HOUSE_ADS.map(({ id, title, desc }) => (
              <li key={id}><strong className="text-gray-800">{title}</strong> — {desc}</li>
            ))}
          </ul>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="w-full mt-16 mb-8 border-t border-[var(--border-color)]/30 pt-12 no-print">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-[var(--text-secondary)] leading-relaxed">
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold tracking-[2px] uppercase text-[var(--text-primary)]">How the Math Works</h4>
              <p>Aura projects your business momentum using the standard compound interest model adapted for SaaS. MRR grows sequentially as new revenue layers onto existing subscriptions minus the churn attrition penalty.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold tracking-[2px] uppercase text-[var(--text-primary)]">SaaS Growth Guide</h4>
              <p>Scaling effectively requires heavy investment in acquisition while rigorously plugging the leaky bucket of churn. Maintaining low churn is exponentially more impactful than high initial growth over a 60-month timeline.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold tracking-[2px] uppercase text-[var(--text-primary)]">Glossary</h4>
              <ul className="space-y-3">
                <li><strong className="text-[var(--accent-color)] block mb-0.5">MRR:</strong>Predictable total software revenue generated every 30 days.</li>
                <li><strong className="text-[var(--accent-color)] block mb-0.5">Churn Rate:</strong>Percentage of paying customers who cancel subscriptions monthly.</li>
                <li><strong className="text-[var(--accent-color)] block mb-0.5">Projection Horizon:</strong>Forward-looking time boundary visualizing total monetary momentum.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 mb-1 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] uppercase tracking-widest opacity-60">
            <span>&copy; {new Date().getFullYear()} Aura SaaS Insights</span>
            <span className="hidden sm:inline">&bull;</span>
            <a href="/privacy" className="hover:text-[var(--accent-color)] transition-colors hover:opacity-100">Privacy Policy</a>
            <span className="hidden sm:inline">&bull;</span>
            <a href="/terms" className="hover:text-[var(--accent-color)] transition-colors hover:opacity-100">Terms of Service</a>
          </div>
          {/* Version string — removed from header, lives here at near-zero opacity */}
          <p className="text-center text-[10px] tracking-[2px] opacity-[0.18] mt-0.5 select-none">
            Logic Engine v1.2.0 · Cinematic Active
          </p>
        </footer>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.6); }
      `}</style>
    </div>
  );
}
