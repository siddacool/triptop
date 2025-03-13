<script lang="ts">
  import { page } from '$app/state';
  import CreateButton from '$lib/components/Budget/List/CreateButton.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import BudgetList from '$lib/components/Budget/List/BudgetList/BudgetList.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';

  const tripId = page.params.tripId;

  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === tripId));
</script>

<title>Budget: {targetTrip?.name || ''}</title>

<PageHeader title={`Budget: ${targetTrip?.name || ''}`} backTo="/" />

<Stack space={4}>
  <CreateButton />
  <BudgetList />
</Stack>

<style lang="scss">
</style>
