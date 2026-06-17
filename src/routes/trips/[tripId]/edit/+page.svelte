<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trips/EditTrip/EditTrip.svelte';
  import { useEditTripStore } from '$lib/stores/trip/edit.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import type { EditTripFormData } from '$lib/stores/trip/types';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;

  async function updateTrip(data: EditTripFormData) {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;
      await useEditTripStore.update(tripId, data);

      toasts.add({
        title: 'Successs',
        description: 'Trip details updated',
        color: 'primary',
      });

      await useTripStore.fetch(tripId);

      await goto(resolve(`/trips/${tripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to edit trip',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }
</script>

<svelte:head>
  <title>Edit trip</title>
</svelte:head>

{#if useTripStore.trip}
  <div>
    <EditTrip data={useTripStore.trip} mode="edit" onsubmit={updateTrip} disabled={fetching} />
  </div>
{:else}
  ---
{/if}
