import type { ExportTripJsonValue } from '$lib/components/Trips/TripPage/TripHeader/Controls/ExportTrip/ExportModal/export/export-json';
import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Expense } from '../expense/types';
import { updateFilterFields } from '../expense/decorators/update-filter-fields';

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
        const { _id, id, ...restProps } = data.trip;

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
          const { id, ...expense } = data.expenses[i];

          const dataToPush: Expense = {
            ...expense,
            _id: nanoid(),
            tripId: newTripId,
            createdAt: now,
            updatedAt: now,
          };

          const filterFields = updateFilterFields(dataToPush);

          newExpenses.push({
            ...dataToPush,
            filterFields,
          });
        }

        await db.expense.bulkAdd(newExpenses);

        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      }
    },
  };
}

export const useTripImportStore = createTripImportStore();
