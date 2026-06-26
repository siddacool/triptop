import type { CurrencyExchangeRate } from '../currency/types';
import { db } from '../db';
import { expenseDecorator } from './decorators/individual-decorator';
import { type Expense } from './types';

function createExpenseStore() {
  let expense: Expense | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get expense() {
      return expense;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(expenseId: string, exchangeRate?: CurrencyExchangeRate | undefined) {
      try {
        fetching = true;

        const data = await db.expense.where({ _id: expenseId }).first();

        if (!data?._id) {
          throw new Error('Expense not found');
        }

        const expensData = expenseDecorator(data, {
          exchangeRate,
        });

        expense = expensData;

        mounted = true;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    reset() {
      expense = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseStore = createExpenseStore();
