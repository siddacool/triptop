<script lang="ts">
  import { page } from '$app/state';
  import EditTripHeader from '$lib/components/Expense/Edit/EditTripHeader.svelte';
  import ExpenseTripStats from '$lib/components/Expense/Edit/ExpenseTripStats/ExpenseTripStats.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
</script>

<title>{targetExpense?.name}</title>

{#if mounted && targetExpense}
  <Stack space={4}>
    <EditTripHeader />
    <ExpenseTripStats />
  </Stack>
{/if}
