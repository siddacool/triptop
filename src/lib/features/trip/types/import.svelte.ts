import type { Expense } from '$lib/features/expense/types';
import type { Trip } from '.';

export type ExportTripData = {
  trip: Trip;
  expenses: Expense[];
};
