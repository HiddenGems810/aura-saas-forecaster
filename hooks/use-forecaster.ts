import { useMemo } from 'react';

export interface ForecasterData {
  month: number;
  startingMrr: number;
  newMrr: number;
  churnedMrr: number;
  revenue: number;
  arr: number;
  cumulativeTotal: number;
}

/**
 * Computes a month-by-month SaaS MRR projection:
 * Ending MRR = Starting MRR + New MRR - Churned MRR.
 */
export function useForecaster(
  startMrr: number,
  growthRate: number,
  churnRate: number,
  months: number = 60,
): ForecasterData[] {
  return useMemo(() => {
    const results: ForecasterData[] = [];
    let currentMrr = Math.max(0, startMrr);
    let cumulative = 0;

    for (let i = 1; i <= months; i++) {
      const startingMrr = Math.max(0, currentMrr);
      const newMrr = startingMrr * (growthRate / 100);
      const churnedMrr = startingMrr * (churnRate / 100);
      const endingMrr = Math.max(0, startingMrr + newMrr - churnedMrr);

      cumulative += endingMrr;
      results.push({
        month: i,
        startingMrr,
        newMrr,
        churnedMrr,
        revenue: endingMrr,
        arr: endingMrr * 12,
        cumulativeTotal: cumulative,
      });

      currentMrr = endingMrr;
    }

    return results;
  }, [startMrr, growthRate, churnRate, months]);
}
