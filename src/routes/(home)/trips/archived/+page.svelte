<script>
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import TripList from '$lib/features/trip/components/TripList/TripList.svelte';
  import { tripListStore } from '$lib/features/trip/store/list.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';

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

    // Do change
    useTripActivePageStore.reset();
  });
</script>

<svelte:head>
  <title>Archived trips</title>
</svelte:head>

<Box>
  <PageHeadingNav>Archived trips</PageHeadingNav>
  {#if loading}
    <Loading />
  {:else if tripListStore.tripsArchived.length}
    <TripList trips={tripListStore.tripsArchived} />
  {:else}
    <Instructions>No archived trips found</Instructions>
  {/if}
</Box>

<style lang="scss">
</style>
