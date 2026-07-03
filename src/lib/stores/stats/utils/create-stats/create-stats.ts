import type { Expense } from '$lib/stores/expense/types';
import type { CategoryStats, DateStats, TripExpenseSummary } from '../../types';
import { defaultExpenseSummary } from './defaultExpenseSummary';
import { finalizeExpenseSummary } from './finalizeExpenseSummary';
import { updateExpenseSummary } from './updateExpenseSummary';

export function createStats(expenses: Expense[]) {
  const categoryMap = new Map<string, CategoryStats>();
  const dateMap = new Map<string, DateStats>();
  const tripSummary: TripExpenseSummary = defaultExpenseSummary();

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    if (!expense.category) {
      continue;
    }

    if (!tripSummary.startDate) {
      tripSummary.startDate = expense.date;
    }

    tripSummary.endDate = expense.date;

    updateExpenseSummary(tripSummary, expense);

    let category = categoryMap.get(expense.category);

    if (!category) {
      category = {
        name: expense.category,
        stats: defaultExpenseSummary(),
      };

      categoryMap.set(expense.category, category);
    }

    updateExpenseSummary(category.stats, expense);

    let date = dateMap.get(expense.date);

    if (!date) {
      date = {
        date: expense.date,
        stats: defaultExpenseSummary(),
      };

      dateMap.set(expense.date, date);
    }

    updateExpenseSummary(date.stats, expense);
  }

  const tripTotal = tripSummary.total.amount;

  finalizeExpenseSummary(tripSummary, tripTotal);

  const categoryStats = [...categoryMap.values()];
  const dateStats = [...dateMap.values()];

  for (let i = 0; i < categoryStats.length; i++) {
    const category = categoryStats[i];

    finalizeExpenseSummary(category.stats, tripTotal);
  }

  for (let i = 0; i < dateStats.length; i++) {
    const date = dateStats[i];

    finalizeExpenseSummary(date.stats, tripTotal);
  }

  return {
    tripSummary,
    categoryStats,
    dateStats,
  };
}
