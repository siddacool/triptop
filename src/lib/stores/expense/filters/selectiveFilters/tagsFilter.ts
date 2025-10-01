import type { Expense } from '../../individual.svelte';
import type { ExpenseSelectiveFilters } from '../index.svelte';

function isPass(targetTags: string[], filterTags: string[]) {
  let pass: boolean = false;

  for (let index = 0; index < targetTags.length; index++) {
    const element = targetTags[index];

    if (filterTags.includes(element)) {
      pass = true;
      break;
    }
  }

  return pass;
}

export function tagsFilter(data: Expense[], filters: ExpenseSelectiveFilters) {
  const tags = filters.tags || [];

  if (!tags?.length) {
    return data;
  }

  const filteredData: Expense[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const targetTags = JSON.parse(element.tags || '[]') as string[];

    if (!targetTags.length) {
      continue;
    }

    const pass = isPass(targetTags, tags);

    if (pass) {
      filteredData.push(element);
    }
  }

  return filteredData;
}
