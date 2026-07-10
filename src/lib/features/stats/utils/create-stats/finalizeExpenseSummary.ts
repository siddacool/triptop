import { calculateAverage } from '$lib/utils/calculateAverage/calculateAverage';
import { calculateShare } from '$lib/utils/calculateShare/calculateShare';
import type { ExpenseSummary } from '../../types';

export function finalizeExpenseSummary(summary: ExpenseSummary, tripTotal: number) {
  summary.average.amount = calculateAverage(summary.total.amount, summary.expenseCount);

  summary.average.amountHomeCurrency = calculateAverage(
    summary.total.amountHomeCurrency,
    summary.expenseCount,
  );

  summary.share = calculateShare(summary.total.amount, tripTotal);
}
