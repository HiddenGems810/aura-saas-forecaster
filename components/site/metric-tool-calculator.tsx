'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Clipboard, Download, Link2, RefreshCw, Sigma } from 'lucide-react';
import { getMetricTool, metricTools } from '@/lib/metric-tools';
import type { MetricTool, MetricToolInput } from '@/lib/metric-tools';

function formatInputValue(input: MetricToolInput, value: number) {
  if (input.prefix === '$') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)}${input.suffix ?? ''}`;
}

function clampToInput(input: MetricToolInput, value: number) {
  if (!Number.isFinite(value)) return input.defaultValue;
  const rounded = Math.round(value / input.step) * input.step;
  return Math.min(input.max, Math.max(input.min, Number(rounded.toFixed(2))));
}

function parseInitialValue(input: MetricToolInput) {
  if (typeof window === 'undefined') return input.defaultValue;
  const raw = new URLSearchParams(window.location.search).get(input.id);
  if (!raw || !/^-?\d+(\.\d+)?$/.test(raw)) return input.defaultValue;
  return clampToInput(input, Number(raw));
}

function createInitialValues(tool: MetricTool) {
  return Object.fromEntries(tool.inputs.map((input) => [input.id, parseInitialValue(input)]));
}

function InputControl({
  input,
  value,
  onChange,
}: {
  input: MetricToolInput;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <label htmlFor={input.id} className="text-sm font-semibold text-slate-200">
          {input.label}
        </label>
        <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-sm text-white">
          {formatInputValue(input, value)}
        </span>
      </div>
      <input
        id={input.id}
        type="range"
        min={input.min}
        max={input.max}
        step={input.step}
        value={value}
        onChange={(event) => onChange(clampToInput(input, Number(event.target.value)))}
        className="w-full"
      />
      <input
        type="number"
        aria-label={`${input.label} numeric value`}
        min={input.min}
        max={input.max}
        step={input.step}
        value={value}
        onChange={(event) => onChange(clampToInput(input, Number(event.target.value)))}
        className="w-full rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-teal-300/60"
      />
      <p className="text-[13px] leading-5 text-slate-400">{input.help}</p>
    </div>
  );
}

export function MetricToolCalculator({ slug }: { slug: string }) {
  const tool = getMetricTool(slug) ?? metricTools[0];

  const [values, setValues] = useState<Record<string, number>>(() => createInitialValues(tool));
  const [statusMessage, setStatusMessage] = useState('');

  const calculation = useMemo(() => tool.calculate(values), [tool, values]);

  useEffect(() => {
    const params = new URLSearchParams();
    tool.inputs.forEach((input) => params.set(input.id, String(values[input.id] ?? input.defaultValue)));
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [tool.inputs, values]);

  const setValue = (input: MetricToolInput, nextValue: number) => {
    setValues((current) => ({ ...current, [input.id]: clampToInput(input, nextValue) }));
  };

  const reset = () => {
    setValues(Object.fromEntries(tool.inputs.map((input) => [input.id, input.defaultValue])));
    setStatusMessage('Calculator reset.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const copyScenarioLink = () => {
    const params = new URLSearchParams();
    tool.inputs.forEach((input) => params.set(input.id, String(values[input.id] ?? input.defaultValue)));
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
    setStatusMessage('Scenario link copied.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const copySummary = () => {
    const summary = [
      `Aura Revenue ${tool.shortTitle} Summary`,
      '',
      ...calculation.exportRows.map(([label, value]) => `${label}: ${value}`),
      '',
      'Educational estimate only. Not financial, tax, accounting, legal, or investment advice.',
    ].join('\n');
    navigator.clipboard.writeText(summary);
    setStatusMessage('Summary copied.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  const downloadCsv = () => {
    const rows = [
      [`Aura Revenue ${tool.shortTitle}`],
      ['Educational use only', 'Not financial advice'],
      [],
      ['Metric', 'Value'],
      ...calculation.exportRows,
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-revenue-${tool.slug}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatusMessage('CSV downloaded.');
    window.setTimeout(() => setStatusMessage(''), 2500);
  };

  return (
    <section className="rounded-2xl border border-teal-300/20 bg-teal-300/[0.025] p-3 shadow-[0_0_50px_rgba(53,242,221,0.06)] sm:p-4">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-white/10 bg-[#11191b] p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-md bg-teal-400/15 p-2 text-teal-300">
              <Sigma size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Calculator Inputs</h2>
              <p className="text-sm text-slate-400">Adjust assumptions and review the result.</p>
            </div>
          </div>

          <div className="space-y-6">
            {tool.inputs.map((input) => (
              <InputControl
                key={input.id}
                input={input}
                value={values[input.id] ?? input.defaultValue}
                onChange={(value) => setValue(input, value)}
              />
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">Export or save this scenario for planning notes.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={downloadCsv} className="inline-flex items-center gap-2 rounded-md bg-teal-300 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-200">
              <Download size={16} /> Download CSV
            </button>
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">
              <Clipboard size={16} /> Copy summary
            </button>
            <button type="button" onClick={copyScenarioLink} className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">
              <Link2 size={16} /> Copy scenario link
            </button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-white/[0.04] hover:text-slate-200">
              <RefreshCw size={16} /> Reset
            </button>
          </div>
          <p aria-live="polite" className="mt-4 min-h-5 text-sm text-teal-200">{statusMessage}</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#11191b] p-5 shadow-xl sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {calculation.results.map((result) => (
              <div key={result.label} className={`rounded-lg border p-5 ${
                result.tone === 'positive'
                  ? 'border-teal-300/20 bg-teal-300/[0.06]'
                  : result.tone === 'warning'
                    ? 'border-amber-300/20 bg-amber-300/[0.08]'
                    : 'border-white/10 bg-slate-950/45'
              }`}>
                <p className="text-sm font-semibold text-slate-200">{result.label}</p>
                <p className="mt-3 whitespace-nowrap text-3xl font-bold tracking-tight text-white tabular-nums">{result.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{result.detail}</p>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-lg border border-teal-300/20 bg-teal-300/[0.06] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Interpret this result</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{calculation.interpretationTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">{calculation.interpretation}</p>
          </section>

          <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Assumption quality check</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {calculation.assumptionChecks.map((message) => (
                <li key={message} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  <span>{message}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">Formula used</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{tool.formulaPreview}</p>
            <div className="mt-4 grid gap-3">
              {calculation.formulaRows.map(([label, formula]) => (
                <div key={label} className="rounded-md border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 break-words font-mono text-sm text-teal-200">{formula}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              For broader model limits, read the <Link className="text-teal-300 hover:text-teal-200" href="/methodology">Aura Revenue methodology</Link>.
            </p>
          </section>

          <section className="mt-6 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] p-5">
            <h3 className="font-semibold text-amber-100">Educational disclaimer</h3>
            <p className="mt-2 text-sm leading-6 text-amber-50/90">
              Aura Revenue provides educational forecasting tools and examples only. Outputs are estimates based on user-provided assumptions and should not be treated as financial, legal, tax, accounting, or investment advice.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
