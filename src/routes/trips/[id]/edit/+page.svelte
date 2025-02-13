<script lang="ts">
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trip/EditTrip/EditTrip.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<title>Edit: {targetTrip?.name}</title>

{#if mounted && targetTrip}
  <h2>Edit: {targetTrip.name}</h2>

  <EditTrip tripId={id} />
{/if}

<style lang="scss">
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
</style>
