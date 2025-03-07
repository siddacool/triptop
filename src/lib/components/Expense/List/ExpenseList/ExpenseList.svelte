<script lang="ts">
  import { page } from '$app/state';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { filterExpenseByDateGroups } from '$lib/stores/expense/expense.svelte';
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';
  import { getFiltredExpenses, useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import ExpenseGroupItem from './ExpenseGroupItem/ExpenseGroupItem.svelte';

  const tripId = page.params.tripId;

  let expenseGroups: ExpenseDateGroup[] = $state([]);

  async function makeExpenseGroups(id: string) {
    const expense = await getFiltredExpenses(id);

    expenseGroups = filterExpenseByDateGroups(expense);
  }

  $effect(() => {
    if (useTripsFilterStore.updatedAt) {
      makeExpenseGroups(tripId);
    }
  });
</script>

<StackItem>
  {#each expenseGroups as expenseGroup (expenseGroup.date)}
    <ExpenseGroupItem {expenseGroup} />
  {/each}
</StackItem>
