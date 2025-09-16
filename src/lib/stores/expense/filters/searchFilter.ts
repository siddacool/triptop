import { normalizeSpaces } from '$lib/helpers/text-manipulations/normalize-spaces';
import type { Expense } from '../individual.svelte';

export function getFilteredExpensesSearchFilter(data: Expense[], search: string) {
  const expenses: Expense[] = [];

  const cleanSearchFilter = normalizeSpaces(search || '').toLowerCase();

  if (!cleanSearchFilter) {
    return data;
  }

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const name = normalizeSpaces(element.name).toLowerCase();
    const category = normalizeSpaces(element.category || '').toLowerCase();
    const paymentMode = normalizeSpaces(element.paymentMode || '').toLowerCase();
    const amount = normalizeSpaces(element.amount.toString()).toLowerCase();
    const currency = normalizeSpaces(element.currency).toLowerCase();

    if (name.includes(cleanSearchFilter)) {
      expenses.push(element);
      continue;
    }

    if (category.includes(cleanSearchFilter)) {
      expenses.push(element);
      continue;
    }

    if (paymentMode.includes(cleanSearchFilter)) {
      expenses.push(element);
      continue;
    }

    if (amount.includes(cleanSearchFilter)) {
      expenses.push(element);
      continue;
    }

    if (currency.includes(cleanSearchFilter)) {
      expenses.push(element);
      continue;
    }
  }

  return expenses;
}
