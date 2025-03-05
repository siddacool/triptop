<script lang="ts">
  import { page } from '$app/state';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import CategoryTable from '$lib/components/Stats/CategoryTable/CategoryTable.svelte';
  import PaymentModeTable from '$lib/components/Stats/PaymentModeTable/PaymentModeTable.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;

  const name = $derived(useTripsStore.data.find((item) => item._id === tripId)?.name || '');
</script>

<title>Statistics: {name}</title>

<PageHeader title={name} backTo={`/${tripId}`} />

<Stack space={3}>
  <StackItem>
    <h2>Statistics</h2>
  </StackItem>
  <CategoryTable />
  <PaymentModeTable />
</Stack>

<style lang="scss">
  h2 {
    margin: 0;
    font-weight: 600;
  }
</style>
