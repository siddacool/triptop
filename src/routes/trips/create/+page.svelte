<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import EditTrip from '$lib/components/Trips/EditTrip/EditTrip.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { useEditTripStore } from '$lib/stores/trip/edit.svelte';
  import type { EditTripFormData } from '$lib/stores/trip/types';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import { onMount } from 'svelte';

  let fetching: boolean = $state(false);

  async function createTrip(data: EditTripFormData) {
    try {
      fetching = true;
      const newTripId = await useEditTripStore.add(data);

      await goto(resolve(`/trips/${newTripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to create trip',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  onMount(() => {
    useTripActivePageStore.reset();
  });
</script>

<svelte:head>
  <title>Create new trip</title>
</svelte:head>

<WhiteMaterial>
  <Box>
    <PageHeadingNav class="TripHeader" href="/trips">Create new trip</PageHeadingNav>
    <EditTrip mode="create" onsubmit={createTrip} disabled={fetching} />
  </Box>
</WhiteMaterial>
