import { type Dayjs } from 'dayjs';
import type { Category } from '../category/types';

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
  searchFields?: {
    name: string;
    date: Dayjs;
  };
}

export interface EditExpenseFormData {
  name?: string;
  amount?: number;
  category?: Category;
  date?: string;
}
