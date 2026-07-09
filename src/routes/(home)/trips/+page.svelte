<script>
  import TripList from '$lib/features/trip/components/TripList/TripList.svelte';
  import TripsControlsToolkit from '$lib/components/Trips/TripsControlsToolkit/TripsControlsToolkit.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import TripAchivedLink from '$lib/features/trip/components/TripAchivedLink.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { onMount } from 'svelte';
  import { tripListStore } from '$lib/features/trip/store/list.svelte';

  let loading = $state(true);

  async function load() {
    try {
      await tripListStore.load();
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    load();

    // Do change
    useTripActivePageStore.reset();
  });
</script>

<svelte:head>
  <title>Trips</title>
</svelte:head>

<Box>
  {#if loading}
    <Loading />
  {:else if tripListStore.trips.length}
    <TripAchivedLink />
    <TripList trips={tripListStore.tripsActive} />
  {:else}
    <Instructions>
      Triptop - Travel budgeting app. <br /> Create/import a trip to get started
    </Instructions>
  {/if}
  <TripsControlsToolkit />
</Box>
