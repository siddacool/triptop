<script>
  import TripAchivedLink from '$lib/components/Trips/TripAchivedLink.svelte';
  import TripList from '$lib/components/Trips/TripList/TripList.svelte';
  import TripsControlsToolkit from '$lib/components/Trips/TripsControlsToolkit/TripsControlsToolkit.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';

  import { onMount } from 'svelte';

  onMount(() => {
    useTripListStore.fetch();
    useTripActivePageStore.reset();
  });
</script>

<svelte:head>
  <title>Trips</title>
</svelte:head>

<Box>
  {#if useTripListStore.fetching}
    <Loading />
  {:else if useTripListStore.mounted && !useTripListStore.tripsAll.length}
    <Instructions>
      Triptop - Travel budgeting app. <br /> Create/import a trip to get started
    </Instructions>
  {:else if useTripListStore.mounted && useTripListStore.tripsAll.length}
    <TripAchivedLink />
    <TripList trips={useTripListStore.tripsActive} />
  {/if}
  <TripsControlsToolkit />
</Box>
