import { useMemo } from 'react';

export interface ForecasterData {
  month: number;
  revenue: number;
  cumulativeTotal: number;
}

/**
 * useForecaster
 *
 * Computes a month-by-month SaaS MRR projection using the standard
 * compound growth formula:
 *
 *   MRR_n = MRR_{n-1} × (1 + g/100 − c/100)
 *
 * The entire computation is wrapped in useMemo and only re-runs when
 * one of the four inputs changes — safe for high-frequency slider events
 * on mobile devices.
 *
 * @param startMrr   - Starting Monthly Recurring Revenue in USD
 * @param growthRate - Monthly growth rate as a percentage (e.g. 8.5 for 8.5%)
 * @param churnRate  - Monthly churn rate as a percentage (e.g. 2.1 for 2.1%)
 * @param months     - Projection horizon in months (12–120)
 */
export function useForecaster(
  startMrr: number,
  growthRate: number,
  churnRate: number,
  months: number = 60,
): ForecasterData[] {
  return useMemo(() => {
    const results: ForecasterData[] = [];
    let currentMrr = startMrr;
    let cumulative = 0;

    const netFactor = 1 + growthRate / 100 - churnRate / 100;

    for (let i = 1; i <= months; i++) {
      currentMrr = currentMrr * netFactor;
      if (currentMrr < 0) currentMrr = 0;
      cumulative += currentMrr;

      results.push({
        month: i,
        revenue: currentMrr,
        cumulativeTotal: cumulative,
      });
    }

    return results;
  }, [startMrr, growthRate, churnRate, months]);
}
