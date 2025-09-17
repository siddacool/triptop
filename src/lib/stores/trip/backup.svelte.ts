import { db } from '../db';
import type { Trip } from './individual.svelte';
import type { Expense } from '../expense/individual.svelte';

export interface BackupTripData {
  trip: Trip;
  expenses: Expense[];
  createdAt: number;
}

function createBackupTripStore() {
  return {
    async export(tripId: string) {
      try {
        const trip = await db.trips.where({ _id: tripId }).first();
        const expenses = await db.expense.where({ tripId: tripId }).toArray();

        if (!trip) {
          return;
        }

        const exportData: BackupTripData = {
          trip,
          expenses,
          createdAt: Date.now(),
        };

        return Promise.resolve(exportData);
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      }
    },
  };
}

export const useBackupTripStore = createBackupTripStore();
