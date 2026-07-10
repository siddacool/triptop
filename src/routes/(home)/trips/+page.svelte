<script>
  import TripList from '$lib/features/trip/components/TripList/TripList.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import TripAchivedLink from '$lib/features/trip/components/TripAchivedLink.svelte';
  import { onMount } from 'svelte';
  import { tripListStore } from '$lib/features/trip/store/list.svelte';
  import TripsControlsToolkit from '$lib/features/trip/components/TripsControlsToolkit/TripsControlsToolkit.svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';

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
  });
</script>

<svelte:head>
  <title>Trips</title>
</svelte:head>

<Box>
  <LoadingBoundary {loading}>
    {#if tripListStore.trips.length}
      <TripAchivedLink />
      <TripList trips={tripListStore.tripsActive} />
    {:else}
      <Instructions>
        Triptop - Travel budgeting app. <br /> Create/import a trip to get started
      </Instructions>
    {/if}
    <TripsControlsToolkit />
  </LoadingBoundary>
</Box>
