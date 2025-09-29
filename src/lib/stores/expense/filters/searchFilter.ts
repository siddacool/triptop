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

    if (name.includes(cleanSearchFilter)) {
      expenses.push(element);
      continue;
    }
  }

  return expenses;
}
