<script lang="ts">
  import { page } from '$app/state';
  import CategoryList from '$lib/components/Statistics/CategoryList';
  import PaymentModeList from '$lib/components/Statistics/PaymentModeList';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const fetching = $derived(
    useTripsStore.fetching || useBudgetStore.fetching || useExpenseStore.fetching ? true : false,
  );

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

{#if mounted && targetTrip}
  <h2>{targetTrip?.name}: Stats</h2>
  <CategoryList />
  <PaymentModeList />
{/if}

{#if fetching}
  <p>Loading...</p>
{/if}

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    font-weight: 600;
  }
</style>
