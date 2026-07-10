import type { Expense } from '$lib/features/expense/types';
import type { Trip, TripCreateData, TripUpdateData } from '../types';
import type { ExportTripData } from '../types/export';

export function validateTripCreate(data: TripCreateData) {
  if (!data.currency) {
    throw new Error('Currency is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}

export function validateTripUpdate(data: TripUpdateData) {
  if (!data.currency) {
    throw new Error('Currency is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}

export function validateTripExportExpenses(trip: Trip | undefined, expenses: Expense[]) {
  if (!trip) {
    throw new Error('Trip not found');
  }

  if (!expenses.some((item) => item.tripId === trip._id)) {
    throw new Error('The expenses dont match the trip');
  }
}

export function validateTripImport(data: ExportTripData) {
  if (!data) {
    throw new Error('Invalid data');
  }

  if (!data.trip) {
    throw new Error('Trip not found');
  }
}
