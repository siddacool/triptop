import type { Expense } from '$lib/features/expense/types';
import type { Trip } from '.';

export type ExportTripData = {
  trip: Trip;
  expenses: Expense[];
};

export const enum ExportTripType {
  JSON = 'JSON',
  CSV = 'CSV',
}

export type ExportTripTypeOption = {
  value: ExportTripType;
  label: string;
};
