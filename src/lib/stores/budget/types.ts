import type { PaymentModes } from '../payment-mode/types';

export interface Budget {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  amount: number;
  tripId: string;
  paymentMode: PaymentModes;
  currency?: string;
}

export type BudgetWiseExpense = {
  currency: string;
  budgets: Budget[];
  total: number;
  budgetUsed: number;
};

export type BudgetFormData = {
  _id?: string;
  name: string;
  amount: number;
  paymentMode: PaymentModes;
  currency: string;
};
