import type { Expense } from '$lib/stores/expense/types';

export type ExpensesDateGroup = {
  date: string;
  expenses: Expense[];
};

export function getGroupExpenses(expenses: Expense[]): ExpensesDateGroup[] {
  const data: ExpensesDateGroup[] = [];

  const newExpenses = expenses.sort((a, b) => (b?.date || '').localeCompare(a?.date || ''));

  for (let i = 0; i < newExpenses.length; i++) {
    const expense = newExpenses[i];
    const date = expense.date;

    const targetIndex = data.findIndex((item) => item.date === date);

    if (targetIndex >= 0) {
      data[targetIndex].expenses.push(expense);
    } else {
      data.push({
        date,
        expenses: [expense],
      });
    }
  }

  return data;
}
