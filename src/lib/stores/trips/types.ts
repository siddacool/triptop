import type { Budget } from '../budget/types';
import type { Category, Expense } from '../expense/types';
import type { PaymentModes } from '../payment-mode/types';

export interface Trip {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export type TripFormData = {
  _id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
};

export type ExportTripData = {
  _id: string;
  trip: Trip;
  expense: Expense[];
  budget: Budget[];
  exportedAt: Date;
};

export type TripFilters = {
  searchTerm?: string;
  paymentMode?: PaymentModes[];
  category?: (Category | 'misc')[];
  budget?: string[];
  currency?: string[];
};
