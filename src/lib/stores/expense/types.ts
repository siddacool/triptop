import type { PaymentModes } from '../payment-mode/types';

export const enum Category {
  FOOD = 'FOOD',
  SHOPPING = 'SHOPPING',
  TOUR = 'TOUR',
  TRANSPORT = 'TRANSPORT',
  STAY = 'STAY',
  FLIGHT = 'FLIGHT',
  ENTERTAINMENT = 'ENTERTAINMENT',
  MART = 'MART',
}

export type CategoryOption = {
  label: string;
  value: Category | undefined;
};

export interface Expense {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  description?: string;
  amount: number;
  tripId: string;
  budgetId?: string;
  category?: Category;
  date: number;

  // if no budgetId
  paymentMode?: PaymentModes;
  currency?: string;
}

export interface ExpenseWithBudget extends Expense {
  budgetName: string;
}

export type ExpenseFormData = {
  name: string;
  description?: string;
  amount: number;
  budgetId?: string;
  category?: Category;
  date: number;

  // if no budgetId
  paymentMode?: PaymentModes;
  currency?: string;
};

export type CurrencyWiseExpense = {
  currency: string;
  expenses: Expense[];
  total: number;
};

export type ExpenseDateGroup = {
  date: string;
  expenses: Expense[];
};
