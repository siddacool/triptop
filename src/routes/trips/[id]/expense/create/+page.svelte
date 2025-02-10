<script lang="ts">
  import EditExpense from '$lib/components/Expense/EditExpense/EditExpense.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );
</script>

{#if mounted}
  <h2>Create expense</h2>

  <EditExpense />
{/if}

<style lang="scss">
</style>
