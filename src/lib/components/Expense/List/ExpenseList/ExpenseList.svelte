<script lang="ts">
  import { page } from '$app/state';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import ExpenseGroupItem from './ExpenseGroupItem/ExpenseGroupItem.svelte';

  const tripId = page.params.tripId;

  const expenseGroups = $derived(getExpenseDateGroups(tripId));
</script>

<StackItem>
  {#each expenseGroups as expenseGroup (expenseGroup.date)}
    <ExpenseGroupItem {expenseGroup} />
  {/each}
</StackItem>
