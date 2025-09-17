import { db } from '../db';
import type { Trip } from './individual.svelte';
import type { Expense } from '../expense/individual.svelte';
import { nanoid } from 'nanoid';

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
    async import(data: BackupTripData) {
      try {
        if (!data?.trip?._id) {
          throw 'Invalid data';
        }

        const newTripId = nanoid();

        const filteredTripData = { ...data.trip };

        delete filteredTripData.id;

        // Import trip
        await db.trips.add({
          ...filteredTripData,
          _id: newTripId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        const expenses: Expense[] = [];

        for (let index = 0; index < data.expenses.length; index++) {
          const element = data.expenses[index];

          delete element.id;

          element._id = nanoid();
          element.tripId = newTripId;

          expenses.push(element);
        }

        // Import expenses
        await db.expense.bulkPut(expenses);

        return Promise.resolve(newTripId);
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      }
    },
  };
}

export const useBackupTripStore = createBackupTripStore();
