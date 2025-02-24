<script lang="ts">
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/Edit/EditExpense/EditExpense.svelte';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
</script>

<title>Edit expense</title>

{#if mounted && targetExpense}
  <Stack space={4}>
    <StackItem><H2>Edit expense</H2></StackItem>
    <StackItem><EditExpense expenseId={id} /></StackItem>
  </Stack>
{/if}
