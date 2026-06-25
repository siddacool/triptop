<script>
  import TripList from '$lib/components/Trips/TripList/TripList.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';

  import { onMount } from 'svelte';

  onMount(() => {
    useTripListStore.fetch();
    useTripActivePageStore.reset();
  });
</script>

<svelte:head>
  <title>Archived trips</title>
</svelte:head>

<Box>
  <PageHeadingNav href="/trips">Archived trips</PageHeadingNav>
  {#if useTripListStore.fetching}
    <Loading />
  {:else if useTripListStore.mounted && !useTripListStore.tripsArchived.length}
    <Instructions>No archived trips found</Instructions>
  {:else if useTripListStore.mounted && useTripListStore.tripsArchived.length}
    <TripList trips={useTripListStore.tripsArchived} />
  {/if}
</Box>

<style lang="scss">
</style>
