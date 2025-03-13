<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import ExpenseFilters from '$lib/components/Expense/List/ExpenseFilters/ExpenseFilters.svelte';
  import ExpenseList from '$lib/components/Expense/List/ExpenseList/ExpenseList.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import CreateButton from '$lib/components/Trips/Details/CreateButton.svelte';
  import TripDetailCard from '$lib/components/Trips/Details/TripDetailCard/TripDetailCard.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;

  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === tripId));

  $effect(() => {
    if (targetTrip) {
      useLocalSettingsStore.updateLastOpenTrip(targetTrip._id);
    }
  });

  beforeNavigate((val) => {
    if (val.to?.route?.id === '/') {
      useLocalSettingsStore.resetLastOpenTrip();
      useTripsFilterStore.clearAllFilters();
    }
  });
</script>

<title>{targetTrip?.name || ''}</title>
<meta name="description" content="Trip details page" />

<PageHeader title={targetTrip?.name || ''} backTo="/">
  <AnchorButton compact href={`/${tripId}/edit`} ariaLabel="Edit Trip">
    <Icon icon="material-symbols:edit" />
  </AnchorButton>
</PageHeader>

<Stack space={4}>
  <TripDetailCard />
  <CreateButton />
  <ExpenseFilters />
  <ExpenseList />
</Stack>

<style lang="scss">
</style>
