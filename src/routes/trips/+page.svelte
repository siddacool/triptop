<script>
  import TripList from '$lib/components/Trips/TripList/TripList.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    useTripListStore.fetch();
  });
</script>

<svelte:head>
  <title>Trips</title>
  <meta name="theme-color" content="#f0f8ff" />
</svelte:head>

<TripList />

<style lang="scss">
</style>
