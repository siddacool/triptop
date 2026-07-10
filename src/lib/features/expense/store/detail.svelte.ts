import { getExpenseById } from '../db';
import type { Expense } from '../types';
import { updateExchangeDetails } from '../utils/decorators/update-exchange-details';

function createExpenseDeatilStore() {
  let expense = $state<Expense | undefined>(undefined);

  return {
    get expense() {
      return expense;
    },
    async load(id: string) {
      const generalExpense = await getExpenseById(id);

      const amountHomeCurrency = updateExchangeDetails(generalExpense, undefined);

      generalExpense.virtualData = {
        amountHomeCurrency,
      };

      expense = generalExpense;
    },
  };
}

export const expenseDeatilStore = createExpenseDeatilStore();
