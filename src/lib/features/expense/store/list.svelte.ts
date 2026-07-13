import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';
import { listTripExpenses } from '../db';
import type { Expense } from '../types';
import { expensesListDecorator } from '../utils/decorators/list-decorator';
import { getFilteredExpenses } from '../utils/filtered-expenses';
import { getExpenseGroupList } from '../utils/group-expenses/group-expenses';
import { getTotalAmountHomeCurrency } from '../utils/total-amount-home-currency/total-amount-home-currency';
import { getTotalAmount } from '../utils/total-amount/total-amount';
import { expenseFiltersStore } from './filters.svelte';

function createExpenseListStore() {
  let expenses = $state<Expense[]>([]);
  const expensesFiltred = $derived(getFilteredExpenses(expenseFiltersStore.filters, expenses));
  const expensesActive = $derived(expensesFiltred.filter((item) => !item.archived));
  const expenseDateGroups = $derived(getExpenseGroupList(expensesFiltred));
  const totalAmount = $derived(getTotalAmount(expensesActive));
  const totalAmountHomeCurrency = $derived(getTotalAmountHomeCurrency(expensesActive));

  return {
    get expenses() {
      return expenses;
    },
    get expensesActive() {
      return expensesActive;
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
      const generalExpenses = await listTripExpenses(tripId);
      const exchangeRate = historicalRatesExchangeStore.exchangeRate;

      expenses = expensesListDecorator(generalExpenses, exchangeRate);
    },
  };
}

export const expenseListStore = createExpenseListStore();
