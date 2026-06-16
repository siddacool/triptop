<script>
  import TripList from '$lib/components/Trips/TripList/TripList.svelte';
  import { useTripsStore } from '$lib/stores/trip/trips.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    useTripsStore.fetch();
  });
</script>

<svelte:head>
  <title>Trips</title>
</svelte:head>

<TripList />

<style lang="scss">
</style>
