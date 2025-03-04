import type { Budget } from '../budget/types';
import type { Expense } from '../expense/types';

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
