<script lang="ts">
  import { page } from '$app/state';
  import EditBudget from '$lib/components/Budget/EditBudget/EditBudget.svelte';
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
  <h2>Edit budget</h2>
  <EditBudget budgetId={id} />
{/if}
