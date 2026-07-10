<script>
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import TripList from '$lib/features/trip/components/TripList/TripList.svelte';
  import { tripListStore } from '$lib/features/trip/store/list.svelte';

  import { onMount } from 'svelte';

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
  <title>Archived trips</title>
</svelte:head>

<Box>
  <PageHeadingNav>Archived trips</PageHeadingNav>
  <LoadingBoundary {loading}>
    {#if tripListStore.tripsArchived.length}
      <TripList trips={tripListStore.tripsArchived} />
    {:else}
      <Instructions>No archived trips found</Instructions>
    {/if}
  </LoadingBoundary>
</Box>

<style lang="scss">
</style>
