import type { Expense } from '$lib/stores/expense/types';
import type { CategoryStats, DateStats, ExpenseSummary } from '../../types';
import { defaultExpenseSummary } from './defaultExpenseSummary';
import { finalizeExpenseSummary } from './finalizeExpenseSummary';
import { updateExpenseSummary } from './updateExpenseSummary';

export function createStats(expenses: Expense[]) {
  const categoryMap = new Map<string, CategoryStats>();
  const dateMap = new Map<string, DateStats>();
  const tripSummary: ExpenseSummary = defaultExpenseSummary();

  for (const expense of expenses) {
    if (!expense.category) {
      continue;
    }

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

  for (const category of categoryStats) {
    finalizeExpenseSummary(category.stats, tripTotal);
  }

  for (const date of dateStats) {
    finalizeExpenseSummary(date.stats, tripTotal);
  }

  return {
    tripSummary,
    categoryStats,
    dateStats,
  };
}
