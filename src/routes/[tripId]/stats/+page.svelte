<script lang="ts">
  import { page } from '$app/state';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import BudgetTable from '$lib/components/Stats/BudgetTable';
  import CategoryTable from '$lib/components/Stats/CategoryTable/CategoryTable.svelte';
  import PaymentModeTable from '$lib/components/Stats/PaymentModeTable';
  import TableFilters from '$lib/components/Stats/TableFilters/TableFilters.svelte';
  import TripSummary from '$lib/components/Stats/TripSummary.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';

  const tripId = page.params.tripId;

  const name = $derived(useTripByIdStore.data?.name || '');
</script>

<title>Statistics: {name}</title>

<PageHeader title={name} backTo={`/${tripId}`} />

<Stack space={3}>
  <StackItem>
    <h2>Statistics</h2>
  </StackItem>
  <TableFilters />
  <TripSummary />
  <CategoryTable />
  <PaymentModeTable />
  <BudgetTable />
</Stack>

<style lang="scss">
  h2 {
    margin: 0;
    font-weight: 600;
  }
</style>
