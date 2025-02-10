<script lang="ts">
  import EditBudget from '$lib/components/Budget/EditBudget/EditBudget.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );
</script>

{#if mounted}
  <h2>Create budget</h2>

  <EditBudget />
{/if}

<style lang="scss">
</style>
