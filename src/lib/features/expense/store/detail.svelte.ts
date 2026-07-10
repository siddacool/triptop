import { getExpenseById } from '../db';
import type { Expense } from '../types';

function createExpenseDeatilStore() {
  let expense = $state<Expense | undefined>(undefined);

  return {
    get expense() {
      return expense;
    },
    async load(id: string) {
      expense = await getExpenseById(id);
    },
  };
}

export const expenseDeatilStore = createExpenseDeatilStore();
