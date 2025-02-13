import type { Budget } from '../budget/types';
import type { Expense } from '../expense/types';
import type { Trip } from '../trips/types';

export interface LibraryData {
  trip: Trip;
  budget: Budget[];
  expense: Expense[];
  createdAt: number;
}
