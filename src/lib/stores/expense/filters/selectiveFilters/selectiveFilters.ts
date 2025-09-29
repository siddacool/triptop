import type { Expense } from '../../individual.svelte';
import type { ExpenseSelectiveFilters } from '../index.svelte';

function baseFilter(
  data: Expense[],
  filters: ExpenseSelectiveFilters,
  filterName: keyof ExpenseSelectiveFilters,
) {
  const filterOptions = filters[filterName] as string[] | undefined;

  if (!filterOptions || !filterOptions.length) {
    return data;
  }

  const filteredData: Expense[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const target = element[filterName as keyof Expense] as string | undefined;

    if (!target) {
      continue;
    }

    if (!filterOptions.includes(target)) {
      continue;
    }

    filteredData.push(element);
  }

  return filteredData;
}

export function getFilteredExpensesSelectiveFilters(
  data: Expense[],
  filters?: ExpenseSelectiveFilters,
) {
  if (!filters) {
    return data;
  }

  const isAnyFilter = Object.values(filters).some((v) => v !== null && v !== undefined);

  if (!isAnyFilter) {
    return data;
  }

  let expenses: Expense[] = [...data];

  expenses = baseFilter(expenses, filters, 'category');
  expenses = baseFilter(expenses, filters, 'paymentMode');
  expenses = baseFilter(expenses, filters, 'currency');

  return expenses;
}
