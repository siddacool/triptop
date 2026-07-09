<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import { deleteTrip } from '../../logic/crud.svelte';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;

  async function handleDeleteTrip() {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;
      await deleteTrip(tripId);

      toasts.add({
        title: 'Successs',
        description: 'Trip deleted',
        color: 'primary',
      });

      useTripActivePageStore.reset();

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
      onaccept: handleDeleteTrip,
    });
  }
</script>

<Button color="danger" onclick={deleteConfirmation} disabled={fetching}>Delete trip</Button>
