<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import TripExpensesSection from '$lib/components/Trips/TripPage/TripExpensesSection/TripExpensesSection.svelte';
  import TripHeader from '$lib/components/Trips/TripPage/TripHeader/TripHeader.svelte';
  import { useTripPageStore } from '$lib/stores/app/pages/trip-page.svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  onMount(() => {
    if (!tripId) {
      return;
    }

    useExpenseListStore.fetch(tripId);
  });

  beforeNavigate((navigation) => {
    // Ignore refresh/tab close
    if (!navigation.to) return;

    useExpenseFiltersStore.reset();
    useTripPageStore.reset();
  });
</script>

<svelte:head>
  <title>{useTripStore.trip?.name || ''}</title>
</svelte:head>

<TripHeader />
<TripExpensesSection />

<style lang="scss">
</style>
