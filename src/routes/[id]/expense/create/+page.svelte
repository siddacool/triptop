<script lang="ts">
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
</script>

<title>Create expense</title>

{#if mounted}
  <Stack space={4}>
    <StackItem>
      <H2>Create expense</H2>
    </StackItem>
  </Stack>

  <EditExpense />
{/if}
