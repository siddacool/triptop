<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import EditTrip from '$lib/components/Trips/EditTrip/EditTrip.svelte';
  import { useEditTripStore } from '$lib/stores/trip/edit.svelte';
  import type { EditTripFormData } from '$lib/stores/trip/types';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';

  let fetching: boolean = $state(false);

  async function createTrip(data: EditTripFormData) {
    try {
      fetching = true;
      await useEditTripStore.add(data);

      await goto(resolve('/trips'));
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
</script>

<svelte:head>
  <title>Create trips</title>
</svelte:head>

<div>
  <EditTrip mode="create" onsubmit={createTrip} disabled={fetching} />
</div>
