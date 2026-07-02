import { calculateAverage } from '$lib/helpers/calculateAverage';
import { calculateShare } from '$lib/helpers/calculateShare';
import type { Expense } from '$lib/stores/expense/types';
import type { CategoryStats, DateStats, ExpenseSummary } from '../types';

function createExpenseSummary(): ExpenseSummary {
  return {
    expenseCount: 0,
    share: 0,
    total: {
      amount: 0,
      amountHomeCurrency: 0,
    },
    average: {
      amount: 0,
      amountHomeCurrency: 0,
    },
    largest: {
      amount: 0,
      amountHomeCurrency: 0,
    },
  };
}

function updateExpenseSummary(summary: ExpenseSummary, expense: Expense) {
  summary.expenseCount++;

  summary.total.amount += expense.amount;
  summary.largest.amount = Math.max(summary.largest.amount, expense.amount);

  const amountHome = expense.virtualData?.amountHomeCurrency;

  if (amountHome !== undefined) {
    summary.total.amountHomeCurrency += amountHome;
    summary.largest.amountHomeCurrency = Math.max(summary.largest.amountHomeCurrency, amountHome);
  }
}

function finalizeExpenseSummary(summary: ExpenseSummary, tripTotal: number) {
  summary.average.amount = calculateAverage(summary.total.amount, summary.expenseCount);

  summary.average.amountHomeCurrency = calculateAverage(
    summary.total.amountHomeCurrency,
    summary.expenseCount,
  );

  summary.share = calculateShare(summary.total.amount, tripTotal);
}

export function createStats(expenses: Expense[], tripTotal: number) {
  const categoryMap = new Map<string, CategoryStats>();
  const dateMap = new Map<string, DateStats>();

  for (const expense of expenses) {
    if (!expense.category) {
      continue;
    }

    let category = categoryMap.get(expense.category);

    if (!category) {
      category = {
        name: expense.category,
        stats: createExpenseSummary(),
      };

      categoryMap.set(expense.category, category);
    }

    updateExpenseSummary(category.stats, expense);

    let date = dateMap.get(expense.date);

    if (!date) {
      date = {
        date: expense.date,
        stats: createExpenseSummary(),
      };

      dateMap.set(expense.date, date);
    }

    updateExpenseSummary(date.stats, expense);
  }

  const categoryStats = [...categoryMap.values()];
  const dateStats = [...dateMap.values()];

  for (const category of categoryStats) {
    finalizeExpenseSummary(category.stats, tripTotal);
  }

  for (const date of dateStats) {
    finalizeExpenseSummary(date.stats, tripTotal);
  }

  return {
    categoryStats,
    dateStats,
  };
}
