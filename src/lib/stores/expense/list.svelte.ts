import { db } from '../db';
import type { Expense } from './individual.svelte';

export interface CurrencyWiseTotal {
  currency: string;
  total: number;
}

function createExpensesStore() {
  let data: Expense[] | undefined = $state(undefined);
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
    async fetch(tripId: string) {
      try {
        fetching = true;

        const expenses = await db.expense.where({ tripId: tripId }).toArray();
        data = expenses.sort((a, b) => b?.date - a?.date);

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

export const useExpensesStore = createExpensesStore();

export function getCurrencyWiseTotal(data: Expense[]) {
  const curruncyWiseTotal: CurrencyWiseTotal[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (curruncyWiseTotal.some((item) => item.currency === element.currency)) {
      const targetCurrencyWiseTotalIndex = curruncyWiseTotal.findIndex(
        (item) => item.currency === element.currency,
      );

      if (targetCurrencyWiseTotalIndex >= 0) {
        curruncyWiseTotal[targetCurrencyWiseTotalIndex].total += element.amount;
      }
    } else {
      curruncyWiseTotal.push({
        currency: element.currency,
        total: element.amount,
      });
    }
  }

  return curruncyWiseTotal;
}

export async function getLatestExpense(tripId: string) {
  try {
    let expenses = await db.expense.where({ tripId: tripId }).toArray();
    expenses = expenses.sort((a, b) => b?.date - a?.date);

    console.log(expenses);

    const latestExpense = expenses.length ? expenses[0] : undefined;

    return Promise.resolve(latestExpense);
  } catch (e) {
    console.error(e);

    return Promise.reject(e);
  }
}
