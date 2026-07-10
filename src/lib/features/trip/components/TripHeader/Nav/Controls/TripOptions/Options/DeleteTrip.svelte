<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Text } from '@flightlesslabs/dodo-ui';
  import { deleteTrip } from '$lib/features/trip/logic/crud.svelte';
  import { clearActiveTrip } from '$lib/features/trip/logic/page.svelte';

  const tripId = page.params.tripId || '';

  async function handleDeleteTrip() {
    try {
      if (!tripId) {
        return;
      }

      await deleteTrip(tripId);

      toasts.add({
        title: 'Successs',
        description: 'Trip deleted',
        color: 'primary',
      });

      clearActiveTrip();

      await goto(resolve('/trips'));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to delete trip',
        description: message,
        color: 'danger',
      });
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

<DropdownMenuItem onSelect={deleteConfirmation} outline>
  <Text color="danger" class="TripPageOptionDeleteText">
    <span class="Icon">
      <Icon icon="material-symbols:delete-outline-rounded" />
    </span>
    Delete trip
  </Text>
</DropdownMenuItem>

<style lang="scss">
  :global(.TripPageOptionDeleteText) {
    display: flex;
    align-items: center;
  }
</style>
