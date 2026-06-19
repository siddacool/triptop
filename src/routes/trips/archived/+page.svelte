<script>
  import TripList from '$lib/components/Trips/TripList/TripList.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';

  import { onMount } from 'svelte';

  onMount(() => {
    useTripListStore.fetch();
  });
</script>

<svelte:head>
  <title>Archived trips</title>
</svelte:head>

<PageHeadingNav href="/trips">Archived trips</PageHeadingNav>

<TripList trips={useTripListStore.tripsArchived} />

<style lang="scss">
</style>
