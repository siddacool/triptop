<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { exchangeRatesCleanup } from '$lib/features/exchange/logic';
  import EditTrip from '$lib/features/trip/components/EditTrip/EditTrip.svelte';
  import { saveTrip } from '$lib/features/trip/logic/crud.svelte';
  import { clearActiveTrip } from '$lib/features/trip/logic/page.svelte';
  import type { TripCreateData } from '$lib/features/trip/types';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import { onMount } from 'svelte';

  let fetching: boolean = $state(false);

  async function createTrip(data: TripCreateData) {
    try {
      fetching = true;
      const newTripId = await saveTrip(data);

      exchangeRatesCleanup();

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
    clearActiveTrip();
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
