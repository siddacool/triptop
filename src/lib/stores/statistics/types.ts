import type { Category, Expense } from '../expense/types';
import type { PaymentModes } from '../payment-mode/types';

export type CategoryWiseExpense = {
  category?: Category;
  expenses: Expense[];
};

export type PaymentModeWiseExpense = {
  paymentMode: PaymentModes;
  expenses: Expense[];
};
