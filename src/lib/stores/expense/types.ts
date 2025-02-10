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
  date: Date;
  time: Date;

  // if no budgetId
  paymentMode?: PaymentModes;
}
