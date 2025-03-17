<script lang="ts">
  import CreateButton from '$lib/components/Budget/List/CreateButton.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import BudgetList from '$lib/components/Budget/List/BudgetList/BudgetList.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { page } from '$app/state';

  const targetTrip = $derived(useTripByIdStore.data);
  const tripId = page.params.tripId;
</script>

<title>Budget: {targetTrip?.name || ''}</title>

<PageHeader title={`Budget: ${targetTrip?.name || ''}`} backTo={`/${tripId}`} />

<Stack space={4}>
  <CreateButton />
  <BudgetList />
</Stack>

<style lang="scss">
</style>
