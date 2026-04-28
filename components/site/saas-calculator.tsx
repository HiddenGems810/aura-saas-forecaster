'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Calculator, Clipboard, Download, Percent, RefreshCw, Save, Share2, Sigma, TrendingUp } from 'lucide-react';
import { useForecaster } from '@/hooks/use-forecaster';

const bounds = {
  mrr: { min: 0, max: 250000, step: 500, default: 10000 },
  growth: { min: 0, max: 50, step: 0.1, default: 8.5 },
  churn: { min: 0, max: 30, step: 0.1, default: 2.1 },
  months: { min: 12, max: 120, step: 12, default: 60 },
} as const;

const scenarioPresets = [
  { label: 'Conservative', growthRate: 3, churnRate: 4 },
  { label: 'Base Case', growthRate: 8.5, churnRate: 2.1 },
  { label: 'Aggressive', growthRate: 12, churnRate: 1.5 },
];

function parseParam(params: URLSearchParams, key: keyof typeof bounds) {
  const raw = params.get(key) ?? (key === 'months' ? params.get('period') : null);
  const config = bounds[key];
  if (!raw || !/^\d+(\.\d+)?$/.test(raw)) return config.default;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return config.default;
  const rounded = Math.round(parsed / config.step) * config.step;
  return Math.min(config.max, Math.max(config.min, Number(rounded.toFixed(2))));
}

function currency(value: number) {
  if (!Number.isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function signedCurrency(value: number) {
  if (!Number.isFinite(value)) return '$0';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
  return value > 0 ? `+${formatted}` : value < 0 ? `-${formatted}` : formatted;
}

function compactCurrency(value: number) {
  if (!Number.isFinite(value)) return '$0';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return currency(value);
}

function ForecastChart({ data }: { data: { month: number; revenue: number }[] }) {
  const width = 1000;
  const height = 320;
  const padding = 28;
  const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);
  const denominator = Math.max(data.length - 1, 1);
  const points = data.map((item, index) => {
    const x = padding + (index / denominator) * (width - padding * 2);
    const y = height - padding - (item.revenue / maxRevenue) * (height - padding * 2);
    return { x, y, month: item.month, revenue: item.revenue };
  });
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? padding} ${height - padding} L ${padding} ${height - padding} Z`;
  const finalPoint = points.at(-1) ?? { x: padding, y: height - padding, revenue: 0, month: 0 };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Projected ending MRR line chart" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="forecastArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((line) => (
        <line
          key={line}
          x1={padding}
          x2={width - padding}
          y1={padding + line * (height - padding * 2)}
          y2={padding + line * (height - padding * 2)}
          stroke="rgba(255,255,255,0.08)"
        />
      ))}
      <path d={areaPath} fill="url(#forecastArea)" />
      <path d={linePath} fill="none" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={finalPoint.x} cy={finalPoint.y} r="7" fill="#2dd4bf" />
      <text x={padding} y={height - 8} fill="#94a3b8" fontSize="24">Month 1</text>
      <text x={width - padding} y={height - 8} fill="#94a3b8" fontSize="24" textAnchor="end">Month {finalPoint.month}</text>
      <text x={width - padding} y={Math.max(22, finalPoint.y - 16)} fill="#ccfbf1" fontSize="28" fontWeight="700" textAnchor="end">
        {compactCurrency(finalPoint.revenue)} MRR
      </text>
    </svg>
  );
}

function Field({
  id,
  label,
  value,
  min,
  max,
  step,
  suffix,
  help,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  help: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-slate-200">
          {label}
        </label>
        <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-sm text-white">
          {suffix === '$' ? currency(value) : `${value}${suffix ?? ''}`}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
      <p className="text-[13px] leading-5 text-slate-400">{help}</p>
    </div>
  );
}

export function SaasCalculator({ showIntro = false }: { showIntro?: boolean }) {
  const initialValues = () => {
    if (typeof window === 'undefined') {
      return {
        startMrr: bounds.mrr.default,
        growthRate: bounds.growth.default,
        churnRate: bounds.churn.default,
        months: bounds.months.default,
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      startMrr: parseParam(params, 'mrr'),
      growthRate: parseParam(params, 'growth'),
      churnRate: parseParam(params, 'churn'),
      months: parseParam(params, 'months'),
    };
  };

  const [startMrr, setStartMrr] = useState(() => initialValues().startMrr);
  const [growthRate, setGrowthRate] = useState(() => initialValues().growthRate);
  const [churnRate, setChurnRate] = useState(() => initialValues().churnRate);
  const [months, setMonths] = useState(() => initialValues().months);
  const [statusMessage, setStatusMessage] = useState('');
  const [savedScenario, setSavedScenario] = useState<{
    label: string;
    startMrr: number;
    growthRate: number;
    churnRate: number;
    months: number;
    finalMrr: number;
    finalArr: number;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('mrr', String(startMrr));
    params.set('growth', String(growthRate));
    params.set('churn', String(churnRate));
    params.set('period', String(months));
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [startMrr, growthRate, churnRate, months]);

  const projection = useForecaster(startMrr, growthRate, churnRate, months);
  const final = projection.at(-1);
  const month12 = projection[Math.min(11, projection.length - 1)];
  const netMonthlyRate = growthRate - churnRate;
  const cumulativeRevenue = final?.cumulativeTotal ?? 0;
  const finalMrr = final?.revenue ?? 0;
  const finalArr = final?.arr ?? 0;
  const isDefaultScenario = startMrr === bounds.mrr.default && growthRate === bounds.growth.default && churnRate === bounds.churn.default && months === bounds.months.default;
  const movementLabel = netMonthlyRate > 0 ? 'positive net revenue movement' : netMonthlyRate < 0 ? 'contraction risk' : 'flat net movement';
  const interpretation =
    netMonthlyRate > 0
      ? 'This scenario shows positive net revenue movement because monthly growth is higher than monthly churn. The model projects MRR expansion over the forecast period, but the result depends heavily on whether the growth and churn assumptions remain realistic over time.'
      : netMonthlyRate < 0
        ? 'This scenario shows contraction risk because monthly churn is higher than monthly growth. The model projects pressure on MRR unless acquisition, expansion, retention, or pricing improves enough to offset lost recurring revenue.'
        : 'This scenario shows flat net movement because monthly growth and monthly churn are equal. The model may keep MRR relatively stable, but small changes in either assumption can shift the forecast upward or downward.';
  const longRangeNote = months > 36 ? ' Because this is a long-range forecast, small assumption changes can compound into large differences.' : '';
  const assumptionMessages = [
    netMonthlyRate > 0
      ? 'Your growth rate is higher than your churn rate, which creates a positive net monthly rate. For stronger planning, compare this forecast with a conservative case using lower growth or higher churn.'
      : netMonthlyRate < 0
        ? 'Your churn rate is higher than your growth rate. Review retention, onboarding, customer fit, pricing, or expansion before treating this forecast as a durable plan.'
        : 'Your growth and churn assumptions offset each other. Use a second scenario to test whether small changes create meaningful upside or downside.',
    churnRate > 8 ? 'High churn can quickly weaken long-term MRR growth.' : '',
    growthRate > 20 ? 'Very high monthly growth may be difficult to sustain for long periods.' : '',
    months > 36 ? 'Long-range forecasts are more sensitive to small assumption changes.' : '',
  ].filter(Boolean);
  const chartSummary = `Chart summary: In this scenario, MRR grows from ${currency(startMrr)} in month 1 to ${currency(finalMrr)} by month ${months}.`;
  const scenarioDifference = savedScenario ? finalMrr - savedScenario.finalMrr : 0;

  const rows = useMemo(() => {
    const step = months <= 24 ? 1 : 12;
    return projection.filter((row) => row.month === 1 || row.month % step === 0 || row.month === months);
  }, [months, projection]);

  const downloadCsv = () => {
    const metadata = [
      'Aura Revenue SaaS MRR Forecast',
      `Starting MRR,${Math.round(startMrr)}`,
      `Monthly Growth Rate,${growthRate.toFixed(1)}%`,
      `Monthly Churn Rate,${churnRate.toFixed(1)}%`,
      `Forecast Period,${months} months`,
      'Educational use only,Not financial advice',
      '',
    ];
    const header = 'Month,Starting MRR,New MRR,Churned MRR,Ending MRR,ARR';
    const csv = projection
      .map((row) => [
        row.month,
        Math.round(row.startingMrr),
        Math.round(row.newMrr),
        Math.round(row.churnedMrr),
        Math.round(row.revenue),
        Math.round(row.arr),
      ].join(','))
      .join('\n');
    const blob = new Blob([[...metadata, header, csv].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-revenue-mrr-forecast-${months}-months.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatusMessage('CSV downloaded.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const copySummary = () => {
    const summary = [
      'Aura Revenue Forecast Summary',
      '',
      `Starting MRR: ${currency(startMrr)}`,
      `Monthly growth rate: ${growthRate.toFixed(1)}%`,
      `Monthly churn rate: ${churnRate.toFixed(1)}%`,
      `Forecast period: ${months} months`,
      '',
      `Projected Month ${months} MRR: ${currency(finalMrr)}`,
      `ARR run rate: ${currency(finalArr)}`,
      `Net monthly rate: ${netMonthlyRate.toFixed(1)}%`,
      '',
      'Educational estimate only. Not financial, tax, accounting, legal, or investment advice.',
    ].join('\n');
    navigator.clipboard.writeText(summary);
    setStatusMessage('Forecast summary copied.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const shareScenario = () => {
    const params = new URLSearchParams();
    params.set('mrr', String(startMrr));
    params.set('growth', String(growthRate));
    params.set('churn', String(churnRate));
    params.set('period', String(months));
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setStatusMessage('Scenario link copied.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const reset = () => {
    setStartMrr(bounds.mrr.default);
    setGrowthRate(bounds.growth.default);
    setChurnRate(bounds.churn.default);
    setMonths(bounds.months.default);
    setStatusMessage('Calculator reset.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const applyPreset = (preset: (typeof scenarioPresets)[number]) => {
    setGrowthRate(preset.growthRate);
    setChurnRate(preset.churnRate);
    setStatusMessage(`${preset.label} assumptions applied.`);
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const saveScenario = () => {
    setSavedScenario({
      label: 'Scenario A',
      startMrr,
      growthRate,
      churnRate,
      months,
      finalMrr,
      finalArr,
    });
    setStatusMessage('Scenario saved.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  return (
    <section id="calculator" className="scroll-mt-24">
      {showIntro ? (
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Free SaaS forecasting calculator</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">SaaS MRR Forecasting Calculator</h2>
          <p className="mt-4 text-slate-300">
            Adjust the assumptions to see how monthly growth and churn change your SaaS revenue forecast over time.
          </p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-teal-300/20 bg-teal-300/[0.025] p-3 shadow-[0_0_50px_rgba(53,242,221,0.06)] sm:p-4">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-white/10 bg-[#11191b] p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-md bg-teal-400/15 p-2 text-teal-300">
              <Calculator size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Forecast Inputs</h2>
              <p className="text-sm text-slate-400">Change assumptions and the model updates instantly.</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scenario presets</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {scenarioPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-2 text-xs font-semibold text-slate-200 hover:border-teal-300/40 hover:bg-teal-300/[0.08] focus:outline-none focus:ring-2 focus:ring-teal-300/40"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Field id="mrr" label="Starting MRR" value={startMrr} min={bounds.mrr.min} max={bounds.mrr.max} step={bounds.mrr.step} suffix="$" help="Your current monthly recurring subscription revenue." onChange={setStartMrr} />
            <Field id="growth" label="Monthly growth rate" value={growthRate} min={bounds.growth.min} max={bounds.growth.max} step={bounds.growth.step} suffix="%" help="New recurring revenue added each month as a percentage of starting MRR." onChange={setGrowthRate} />
            <Field id="churn" label="Monthly churn rate" value={churnRate} min={bounds.churn.min} max={bounds.churn.max} step={bounds.churn.step} suffix="%" help="Recurring revenue lost each month from cancellations or downgrades." onChange={setChurnRate} />
            <Field id="months" label="Forecast period" value={months} min={bounds.months.min} max={bounds.months.max} step={bounds.months.step} suffix=" months" help="Number of months to project from the starting MRR baseline." onChange={setMonths} />
          </div>
          {isDefaultScenario ? (
            <p className="mt-4 rounded-md border border-teal-300/15 bg-teal-300/[0.06] px-3 py-2 text-sm leading-6 text-teal-100">
              Default scenario: $10,000 starting MRR, 8.5% growth, 2.1% churn, and 60 months.
            </p>
          ) : null}
          <p className="mt-6 text-sm leading-6 text-slate-400">Export or save this forecast for planning notes.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={downloadCsv} className="inline-flex items-center gap-2 rounded-md bg-teal-300 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-200">
              <Download size={16} /> Download CSV
            </button>
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">
              <Clipboard size={16} /> Copy summary
            </button>
            <button type="button" onClick={shareScenario} className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">
              <Share2 size={16} /> Copy scenario link
            </button>
            <button type="button" onClick={saveScenario} className="inline-flex items-center gap-2 rounded-md border border-teal-300/30 px-3 py-2 text-sm font-semibold text-teal-100 hover:bg-teal-300/10">
              <Save size={16} /> Compare another scenario
            </button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-white/[0.04] hover:text-slate-200">
              <RefreshCw size={16} /> Reset
            </button>
          </div>
          <p aria-live="polite" className="mt-4 min-h-5 text-sm text-teal-200">{statusMessage}</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#11191b] p-5 shadow-xl sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="min-w-0 rounded-lg border border-teal-300/20 bg-slate-950/65 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Total forecast revenue</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Cumulative revenue across {months} months</p>
                </div>
                <Sigma size={18} className="shrink-0 text-teal-300" />
              </div>
              <p className="mt-5 whitespace-nowrap text-4xl font-bold tracking-tight text-white tabular-nums">{currency(cumulativeRevenue)}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Based on {currency(startMrr)} starting MRR, {growthRate.toFixed(1)}% growth, and {churnRate.toFixed(1)}% churn.
              </p>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {[
                { label: `Month ${months} MRR`, detail: 'Ending recurring revenue', value: currency(finalMrr), Icon: TrendingUp },
                { label: 'ARR run rate', detail: `Month ${months} annualized`, value: currency(finalArr), Icon: BarChart3 },
                { label: 'Net monthly rate', detail: 'Growth minus churn', value: `${netMonthlyRate.toFixed(1)}%`, Icon: Percent },
              ].map(({ label, detail, value, Icon }) => (
                <div key={label} className="min-w-0 rounded-lg border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{label}</p>
                      <p className="mt-1 text-xs leading-4 text-slate-500">{detail}</p>
                    </div>
                    <Icon size={17} className="shrink-0 text-teal-300" />
                  </div>
                  <p className="mt-3 whitespace-nowrap text-2xl font-bold tracking-tight text-white tabular-nums">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {savedScenario ? (
            <section className="mt-6 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Scenario comparison</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Current scenario</p>
                  <p className="mt-2 text-lg font-semibold text-white">{currency(finalMrr)}</p>
                  <p className="text-sm text-slate-400">ARR run rate: {currency(finalArr)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Saved scenario</p>
                  <p className="mt-2 text-lg font-semibold text-white">{currency(savedScenario.finalMrr)}</p>
                  <p className="text-sm text-slate-400">ARR run rate: {currency(savedScenario.finalArr)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Difference</p>
                  <p className={`mt-2 text-lg font-semibold ${scenarioDifference >= 0 ? 'text-teal-200' : 'text-rose-200'}`}>
                    {signedCurrency(scenarioDifference)} MRR
                  </p>
                  <p className="text-sm text-slate-400">Current minus saved</p>
                </div>
              </div>
            </section>
          ) : null}

          <section className="mt-6 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Interpret this forecast</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{movementLabel}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">{interpretation}{longRangeNote}</p>
          </section>

          <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Assumption quality check</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {assumptionMessages.map((message) => (
                <li key={message} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  <span>{message}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6 h-[300px] rounded-lg border border-white/10 bg-slate-950/40 p-4">
            <ForecastChart data={projection} />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">{chartSummary}</p>

          <div className="mt-6 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-4">Month</th>
                  <th className="px-4 py-4 text-right">Starting MRR</th>
                  <th className="px-4 py-4 text-right">New MRR</th>
                  <th className="px-4 py-4 text-right">Churned MRR</th>
                  <th className="px-4 py-4 text-right">Ending MRR</th>
                  <th className="px-4 py-4 text-right">ARR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((row) => (
                  <tr key={row.month} className="text-slate-200">
                    <td className="px-4 py-4">{row.month}</td>
                    <td className="px-4 py-4 text-right tabular-nums">{currency(row.startingMrr)}</td>
                    <td className="px-4 py-4 text-right text-teal-200 tabular-nums">{currency(row.newMrr)}</td>
                    <td className="px-4 py-4 text-right text-rose-200 tabular-nums">{currency(row.churnedMrr)}</td>
                    <td className="px-4 py-4 text-right font-semibold text-white tabular-nums">{currency(row.revenue)}</td>
                    <td className="px-4 py-4 text-right tabular-nums">{currency(row.arr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-3 md:hidden">
            {rows.map((row) => (
              <div key={row.month} className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Month {row.month}</h3>
                  <span className="font-mono text-sm text-teal-200">{currency(row.revenue)} MRR</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Starting MRR', currency(row.startingMrr)],
                    ['New MRR', currency(row.newMrr)],
                    ['Churned MRR', currency(row.churnedMrr)],
                    ['ARR', currency(row.arr)],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-slate-500">{label}</dt>
                      <dd className="mt-1 font-mono text-slate-200">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-white">Assumptions</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            The model treats growth as new recurring MRR added each month and churn as recurring MRR lost each month. Month 12 MRR is {currency(month12?.revenue ?? 0)} with the current inputs.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-white">Formula used in this forecast</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">Ending MRR = Starting MRR + New MRR - Churned MRR</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-semibold text-teal-300">View formula details</summary>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              <p>New MRR = Starting MRR x Monthly Growth Rate</p>
              <p>Churned MRR = Starting MRR x Monthly Churn Rate</p>
              <p>ARR Run Rate = Ending MRR x 12</p>
              <p><Link className="text-teal-300 hover:text-teal-200" href="/methodology">Read the methodology</Link>.</p>
            </div>
          </details>
        </div>
        <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
          <h3 className="font-semibold text-amber-100">Educational disclaimer</h3>
          <p className="mt-2 text-sm leading-6 text-amber-50/90">
            Aura Revenue provides educational SaaS forecasting estimates only. Results are based on the assumptions entered and should not be treated as financial, investment, tax, or legal advice.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
