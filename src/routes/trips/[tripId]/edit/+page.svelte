<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trips/EditTrip/EditTrip.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import { useEditTripStore } from '$lib/stores/trip/edit.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import type { EditTripFormData } from '$lib/stores/trip/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';

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

  async function deleteTrip() {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;
      await useEditTripStore.delete(tripId);

      toasts.add({
        title: 'Successs',
        description: 'Trip deleted',
        color: 'primary',
      });

      await useTripStore.fetch(tripId);

      await goto(resolve('/trips'));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to delete trip',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  function deleteConfirmation() {
    modals.add('confirm', {
      title: 'Delete Trip',
      description: 'Are you sure you want to delete this trip?',
      onaccept: deleteTrip,
    });
  }
</script>

<svelte:head>
  <title>Edit trip</title>
</svelte:head>

{#if useTripStore.trip}
  <div>
    <EditTrip data={useTripStore.trip} mode="edit" onsubmit={updateTrip} disabled={fetching} />
  </div>

  <ControlSection controlsAlignment="center" class="TripEditControls">
    <Button color="danger" onclick={deleteConfirmation}>Delete trip</Button>
  </ControlSection>
{:else}
  ---
{/if}

<style lang="scss">
  :global(.TripEditControls) {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
