import { Category } from '$lib/features/expense/types/category';
import type { Expense } from '$lib/features/expense/types';
import type { GroupStats, ExpenseSummary } from '../../types';
import { defaultExpenseSummary } from './defaultExpenseSummary';
import { finalizeExpenseSummary } from './finalizeExpenseSummary';
import { updateExpenseSummary } from './updateExpenseSummary';

function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
  let value = map.get(key);

  if (value === undefined) {
    value = create();
    map.set(key, value);
  }

  return value;
}

const categoryOrder = Object.values(Category).reduce(
  (order, category, index) => {
    order[category] = index;
    return order;
  },
  {} as Record<Category, number>,
);

export type CreateStatsReturnValue = {
  tripSummary: ExpenseSummary;
  categoryStats: GroupStats[];
  dateStats: GroupStats[];
};

export function createStats(expenses: Expense[]): CreateStatsReturnValue {
  const categoryMap = new Map<string, GroupStats>();
  const dateMap = new Map<string, GroupStats>();
  const tripSummary: ExpenseSummary = defaultExpenseSummary();

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const { date: expenseDate, category: expenseCategory } = expense;

    if (!expenseCategory) {
      continue;
    }

    if (!tripSummary.endDate) {
      tripSummary.endDate = expenseDate;
    }

    tripSummary.startDate = expenseDate;

    if (expense.archived) {
      continue;
    }

    updateExpenseSummary(tripSummary, expense);

    const category = getOrCreate(categoryMap, expenseCategory, () => ({
      id: expenseCategory,
      stats: defaultExpenseSummary(),
    }));

    updateExpenseSummary(category.stats, expense);

    const date = getOrCreate(dateMap, expenseDate, () => ({
      id: expenseDate,
      stats: defaultExpenseSummary(),
    }));

    updateExpenseSummary(date.stats, expense);
  }

  const tripTotal = tripSummary.total.amount;

  finalizeExpenseSummary(tripSummary, tripTotal);

  const categoryStats = [...categoryMap.values()];

  categoryStats.sort((a, b) => categoryOrder[a.id as Category] - categoryOrder[b.id as Category]);

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
