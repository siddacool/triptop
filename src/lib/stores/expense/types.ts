import type { Category } from '../category/types';
import type { PaymentModes } from '../payment-modes/types';

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
  paymentMode?: PaymentModes;
  archived?: boolean;
  searchFields?: {
    name: string;
  };
}

export interface EditExpenseFormData {
  name?: string;
  amount?: number;
  category?: Category;
  date?: string;
  paymentMode?: PaymentModes;
}
