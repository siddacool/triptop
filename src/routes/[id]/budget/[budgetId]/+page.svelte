<script lang="ts">
  import { page } from '$app/state';
  import BudgetStats from '$lib/components/Budget/Edit/BudgetStats/BudgetStats.svelte';
  import BudgetStatsHeader from '$lib/components/Budget/Edit/BudgetStatsHeader.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === id));
</script>

{#if mounted && targetBudget}
  <Stack space={4}>
    <BudgetStatsHeader />
    <BudgetStats />
  </Stack>
{/if}
