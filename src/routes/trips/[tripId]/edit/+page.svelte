<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trips/EditTrip/EditTrip.svelte';
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

  <div class="controls">
    <Button color="danger" onclick={deleteConfirmation}>Delete trip</Button>
  </div>
{:else}
  ---
{/if}

<style lang="scss">
  .controls {
    margin-top: calc(var(--dodo-ui-space) * 3);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
    }

    :global(.dodo-ui-Button) {
      width: 100%;
      margin-bottom: calc(var(--dodo-ui-space) * 2);

      @media (min-width: 600px) {
        width: initial;
        margin: 0 var(--dodo-ui-space);
        margin-bottom: 0;
      }
    }
  }
</style>
