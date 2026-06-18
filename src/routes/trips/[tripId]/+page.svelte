<script lang="ts">
  import { page } from '$app/state';
  import TripExpensesSection from '$lib/components/Trips/TripPage/TripExpensesSection/TripExpensesSection.svelte';
  import TripHeader from '$lib/components/Trips/TripPage/TripHeader/TripHeader.svelte';
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
</script>

<svelte:head>
  <title>{useTripStore.trip?.name || ''}</title>
</svelte:head>

<TripHeader />
<TripExpensesSection />

<style lang="scss">
</style>
