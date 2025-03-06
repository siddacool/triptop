import type { Category, Expense } from '../expense/types';
import type { PaymentModes } from '../payment-mode/types';

export type CategoryWiseStatsExpense = {
  category?: Category;
  expenses: Expense[];
};

export type PaymentModeWiseStatsExpense = {
  paymentMode: PaymentModes;
  expenses: Expense[];
};

export type BudgetWiseStatsExpense = {
  name: string;
  paymentMode: PaymentModes;
  budgetId?: string;
  expenses: Expense[];
};
