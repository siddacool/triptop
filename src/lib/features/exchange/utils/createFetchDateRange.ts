import type { Dayjs } from 'dayjs';

export function createFetchDateRange(expenseStartDate: Dayjs, expenseEndDate: Dayjs) {
  // Considering the data for the whole month
  const startDate = expenseStartDate.subtract(2, 'day').startOf('month').format('YYYY-MM-DD');
  const endDate = expenseEndDate.add(2, 'day').endOf('month').format('YYYY-MM-DD');

  return {
    startDate,
    endDate,
  };
}
