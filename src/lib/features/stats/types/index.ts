import type { MoneyValue } from '$lib/features/trip/types/currency';

export type ExpenseSummary = {
  expenseCount: number;
  share: number;
  total: MoneyValue;
  average: MoneyValue;
  largest: MoneyValue;
  startDate?: string;
  endDate?: string;
};

export type GroupStats = {
  id: string;
  stats: ExpenseSummary;
};
