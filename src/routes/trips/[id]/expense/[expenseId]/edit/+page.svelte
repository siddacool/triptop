<script lang="ts">
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/EditExpense/EditExpense.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
</script>

{#if mounted && targetExpense}
  <h2>Edit expense</h2>
  <EditExpense expenseId={id} />
{/if}

<style lang="scss">
</style>
