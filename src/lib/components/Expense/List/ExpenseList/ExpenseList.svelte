<script lang="ts">
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { filterExpenseByDateGroups } from '$lib/stores/expense/expense.svelte';
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';
  import { getFiltredExpenses, useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import ExpenseGroupItem from './ExpenseGroupItem/ExpenseGroupItem.svelte';

  let expenseGroups: ExpenseDateGroup[] = $state([]);

  async function makeExpenseGroups() {
    const expense = await getFiltredExpenses();

    expenseGroups = filterExpenseByDateGroups(expense);
  }

  $effect(() => {
    if (useTripsFilterStore.updatedAt) {
      makeExpenseGroups();
    }
  });
</script>

<StackItem>
  {#each expenseGroups as expenseGroup (expenseGroup.date)}
    <ExpenseGroupItem {expenseGroup} />
  {/each}
</StackItem>
