import { listTripExpenses } from '../db';
import type { Expense } from '../types';
import { getFilteredExpenses } from '../utils/filtered-expenses';
import { getExpenseGroupList } from '../utils/group-expenses/group-expenses';
import { getTotalAmountHomeCurrency } from '../utils/total-amount-home-currency/total-amount-home-currency';
import { getTotalAmount } from '../utils/total-amount/total-amount';
import { expenseFiltersStore } from './filters.svelte';

function createExpenseListStore() {
  let expenses = $state<Expense[]>([]);
  const expensesSorted = $derived(expenses.sort((a, b) => b.date.localeCompare(a.date)));
  const expensesFiltred = $derived(
    getFilteredExpenses(expenseFiltersStore.filters, expensesSorted),
  );
  const expenseDateGroups = $derived(getExpenseGroupList(expensesFiltred));
  const totalAmount = getTotalAmount(expensesFiltred);
  const totalAmountHomeCurrency = getTotalAmountHomeCurrency(expensesFiltred);

  return {
    get expenses() {
      return expenses;
    },
    get expensesSorted() {
      return expensesSorted;
    },
    get expensesFiltred() {
      return expensesFiltred;
    },
    get expenseDateGroups() {
      return expenseDateGroups;
    },
    get totalAmount() {
      return totalAmount;
    },
    get totalAmountHomeCurrency() {
      return totalAmountHomeCurrency;
    },
    async load(tripId: string) {
      expenses = await listTripExpenses(tripId);
    },
  };
}

export const expenseListStore = createExpenseListStore();
