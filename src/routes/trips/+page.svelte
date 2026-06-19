<script>
  import MainPageHeader from '$lib/components/MainPage/MainPageHeader/MainPageHeader.svelte';
  import TripAchivedLink from '$lib/components/Trips/TripAchivedLink.svelte';
  import TripList from '$lib/components/Trips/TripList/TripList.svelte';
  import TripsControlsToolkit from '$lib/components/Trips/TripsControlsToolkit/TripsControlsToolkit.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';

  import { onMount } from 'svelte';

  onMount(() => {
    useTripListStore.fetch();
  });
</script>

<svelte:head>
  <title>Trips</title>
</svelte:head>

<MainPageHeader />
<TripAchivedLink />
<TripList trips={useTripListStore.tripsActive} />
<TripsControlsToolkit />

<style lang="scss">
</style>
