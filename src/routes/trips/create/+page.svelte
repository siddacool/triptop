<script lang="ts">
  import EditTrip from '$lib/components/Trip/EditTrip';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );
</script>

{#if mounted}
  <h2>Create trip</h2>

  <EditTrip />
{/if}

<style lang="scss">
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
</style>
