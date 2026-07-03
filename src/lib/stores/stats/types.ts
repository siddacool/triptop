import type { Category } from '../category/types';
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
};

export type TripExpenseSummary = ExpenseSummary & {
  startDate?: string;
  endDate?: string;
};

export type DateSummary = {
  startDate: string;
  endDate: string;
};

export type CategoryStats = {
  name: Category;
  stats: ExpenseSummary;
};

// date yyyy-mm-dd
export type DateStats = {
  date: string;
  stats: ExpenseSummary;
};
