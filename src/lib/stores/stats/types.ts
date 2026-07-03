import type { MoneyValue } from '../currency/types';

export type ExpenseSummary = {
  expenseCount: number;
  share: number;
  total: MoneyValue;
  average: MoneyValue;
  largest: {
    amount?: number;
    amountHomeCurrency?: number;
    expenseId?: string;
  };
  startDate?: string;
  endDate?: string;
};

export type GroupStats = {
  id: string;
  stats: ExpenseSummary;
};
