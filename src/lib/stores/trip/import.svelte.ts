import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Expense } from '../expense/types';
import type { ExportTripJsonValue } from '$lib/components/Trips/TripPage/TripHeader/TripDetails/Controls/ExportTrip/ExportModal/export/export-json';

function createTripImportStore() {
  let fetching: boolean = $state(false);

  return {
    get fetching() {
      return fetching;
    },
    async importTrip(data: ExportTripJsonValue) {
      try {
        fetching = true;

        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        const { _id, id, deviceOnlyData, ...restProps } = data.trip;

        const newTripId = nanoid();
        const now = Date.now();

        await db.trips.add({
          _id: newTripId,
          ...restProps,
          createdAt: now,
          updatedAt: now,
        });

        const newExpenses: Expense[] = [];

        for (let i = 0; i < data.expenses.length; i++) {
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          const { id, virtualData, ...expense } = data.expenses[i];

          newExpenses.push({
            ...expense,
            _id: nanoid(),
            tripId: newTripId,
            createdAt: now,
            updatedAt: now,
          });
        }

        await db.expense.bulkAdd(newExpenses);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const useTripImportStore = createTripImportStore();
