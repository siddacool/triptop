import { db } from '../db';
import type { Trip } from './individual.svelte';

function createTripsStore() {
  let data: Trip[] | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get data() {
      return data;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch() {
      try {
        fetching = true;

        const expenses = await db.expense.toArray();

        let trips = await db.trips.toArray();

        trips.sort((a, b) => b?.createdAt - a?.createdAt);

        let tripsWithUpdatedExpenses: Trip[] = [];
        let tripsWithoutUpdatedExpenses: Trip[] = [];

        for (let index = 0; index < trips.length; index++) {
          const element = trips[index];
          const targetExpenses = expenses
            .filter((item) => item.tripId === element._id)
            .sort((a, b) => b.updatedAt - a.updatedAt);
          const expensesUpdatedAt = targetExpenses.length ? targetExpenses[0].updatedAt : undefined;

          if (expensesUpdatedAt) {
            tripsWithUpdatedExpenses.push({
              ...element,
              expensesUpdatedAt,
            });
          } else {
            tripsWithoutUpdatedExpenses.push(element);
          }
        }

        tripsWithUpdatedExpenses = tripsWithUpdatedExpenses.sort(
          (a, b) => (b?.expensesUpdatedAt as number) - (a?.expensesUpdatedAt as number),
        );

        console.log(tripsWithUpdatedExpenses, tripsWithoutUpdatedExpenses);

        data = [...tripsWithUpdatedExpenses, ...tripsWithoutUpdatedExpenses];

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    reset() {
      data = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripsStore = createTripsStore();
