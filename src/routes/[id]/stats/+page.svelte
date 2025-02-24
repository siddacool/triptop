<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import CategoryTable from '$lib/components/Statistics/CategoryTable/CategoryTable.svelte';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import H3 from '$lib/components/ui-framework/Headings/H3.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
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

  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === id));

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<title>{targetTrip?.name}: Stats</title>

<Stack space={4}>
  {#if mounted && targetTrip}
    <StackItem>
      <H2>{targetTrip?.name}: Stats</H2>
      <p>Total Expense: <FormattedCurrency value={totalExpenses} /></p>
    </StackItem>
    <CategoryTable />
  {:else if fetching}
    <StackItem><H3>Loading...</H3></StackItem>
  {:else}
    <StackItem>
      <H3>No trip found</H3>
    </StackItem>
  {/if}
</Stack>

<style lang="scss">
  p {
    margin-bottom: 0;
  }
</style>
