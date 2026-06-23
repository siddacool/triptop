import type { Category } from '../category/types';

export interface ExpenseFilterFields {
  name: string;
  date: number;
}

export interface Expense {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  amount: number;
  tripId: string;
  category?: Category;
  date: string;
  archived?: boolean;
  filterFields?: ExpenseFilterFields;
}

export interface EditExpenseFormData {
  name?: string;
  amount?: number;
  category?: Category;
  date?: string;
}
