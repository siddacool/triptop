import { getMoment } from '@flightlesslabs/utils';
import { db } from '../db';
import type { Expense } from './individual.svelte';
import validateJson from '$lib/helpers/validators/vaidate-json';

export interface CurrencyWiseTotal {
  currency: string;
  total: number;
}

export interface DateWiseExpense {
  id: string;
  date?: string;
  expense?: Expense;
}

export interface DateWiseExpenseRaw {
  date: string;
  expenses: Expense[];
}

function createExpensesStore() {
  let data: Expense[] | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get data() {
      return data;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripId: string) {
      try {
        fetching = true;

        const expenses = await db.expense.where({ tripId: tripId }).toArray();
        data = expenses
          .sort((a, b) => b?.createdAt - a?.createdAt)
          .sort((a, b) => b?.date - a?.date);

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    reset() {
      data = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpensesStore = createExpensesStore();

export function getCurrencyWiseTotal(data: Expense[]) {
  const curruncyWiseTotal: CurrencyWiseTotal[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (curruncyWiseTotal.some((item) => item.currency === element.currency)) {
      const targetCurrencyWiseTotalIndex = curruncyWiseTotal.findIndex(
        (item) => item.currency === element.currency,
      );

      if (targetCurrencyWiseTotalIndex >= 0) {
        curruncyWiseTotal[targetCurrencyWiseTotalIndex].total += element.amount;
      }
    } else {
      curruncyWiseTotal.push({
        currency: element.currency,
        total: element.amount,
      });
    }
  }

  return curruncyWiseTotal;
}

export async function getLatestExpense(tripId: string) {
  try {
    let expenses = await db.expense.where({ tripId: tripId }).toArray();
    expenses = expenses.sort((a, b) => b?.date - a?.date);

    const latestExpense = expenses.length ? expenses[0] : undefined;

    return Promise.resolve(latestExpense);
  } catch (e) {
    console.error(e);

    return Promise.reject(e);
  }
}

export function getDateWiseExpenses(data: Expense[]) {
  const dateWiseExpensesRaw: DateWiseExpenseRaw[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const dateString = getMoment(element.date).format('YYYY-MM-DD');

    if (dateWiseExpensesRaw.some((item) => item.date === dateString)) {
      const targetDateWiseExpenseIndex = dateWiseExpensesRaw.findIndex(
        (item) => item.date === dateString,
      );

      if (targetDateWiseExpenseIndex >= 0) {
        dateWiseExpensesRaw[targetDateWiseExpenseIndex].expenses.push(element);
      }
    } else {
      dateWiseExpensesRaw.push({
        date: dateString,
        expenses: [element],
      });
    }
  }

  const dateWiseExpenses: DateWiseExpense[] = [];

  for (let index = 0; index < dateWiseExpensesRaw.length; index++) {
    const element = dateWiseExpensesRaw[index];
    const expenses = element.expenses;

    dateWiseExpenses.push({
      id: `${element.date}`,
      date: element.date,
    });

    for (let index2 = 0; index2 < expenses.length; index2++) {
      const expense = expenses[index2];

      dateWiseExpenses.push({
        id: `${element.date}-${expense._id}`,
        expense,
      });
    }
  }

  return dateWiseExpenses;
}

export function getCurrenciesUsed(data: Expense[]) {
  const currencies: string[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const currency = element.currency;

    if (currencies.some((item) => item === currency)) {
      continue;
    }

    currencies.push(currency);
  }

  return currencies;
}

export function getExpenseDatesOnly(data: Expense[]) {
  const dates: string[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const dateString = getMoment(element.date).format('YYYY-MM-DD');

    if (dates.some((item) => item === dateString)) {
      continue;
    }

    dates.push(dateString);
  }

  return dates;
}

export function getExpenseTags(data: Expense[]) {
  const tags: string[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (!element.tags) {
      continue;
    }

    if (!validateJson(element.tags)) {
      continue;
    }

    const tagsList = JSON.parse(element.tags) as string[];

    for (let index2 = 0; index2 < tagsList.length; index2++) {
      const tag = tagsList[index2];

      if (tags.some((t) => t === tag)) {
        continue;
      }

      tags.push(tag);
    }
  }

  return tags;
}
