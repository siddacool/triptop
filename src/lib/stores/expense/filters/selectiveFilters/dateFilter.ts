import { getMoment } from '@flightlesslabs/utils';
import type { Expense } from '../../individual.svelte';
import type { ExpenseSelectiveFilters } from '../index.svelte';

export function dateFilter(data: Expense[], filters: ExpenseSelectiveFilters) {
  const { startDate, endDate } = filters.date || {};

  if (!startDate || !endDate) {
    return data;
  }

  const filteredData: Expense[] = [];
  const startDateMoment = getMoment(startDate).subtract(1, 'day');
  const endDateMoment = getMoment(endDate).add(1, 'day');

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const targetMoment = getMoment(element.date);

    if (
      targetMoment.isAfter(startDateMoment, 'day') &&
      targetMoment.isBefore(endDateMoment, 'day')
    ) {
      filteredData.push(element);
    }
  }

  return filteredData;
}
