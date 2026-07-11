<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { archiveTrip, unarchiveTrip } from '$lib/features/trip/logic/crud.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';

  const tripId = page.params.tripId || '';

  async function hnadleArchiveTrip(archiveState: boolean) {
    try {
      if (!tripId) {
        return;
      }

      if (archiveState) {
        await archiveTrip(tripId);
      } else {
        await unarchiveTrip(tripId);
      }

      await tripDetailStore.load(tripId);

      toasts.add({
        title: 'Successs',
        description: `Trip ${archiveState ? 'archived' : 'unarchived'}`,
        color: 'primary',
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: `Failed to ${archiveState ? 'archive' : 'unarchive'} trip`,
        description: message,
        color: 'danger',
      });
    }
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive Trip',
      description: 'Are you sure you want to archive this trip?',
      onaccept: () => hnadleArchiveTrip(true),
    });
  }

  function onselect() {
    const archiveState = tripDetailStore.trip?.archived || false;
    const archiveCondition = !archiveState;

    if (archiveCondition) {
      archiveConfirmation();
      return;
    }

    hnadleArchiveTrip(false);
  }
</script>

<DropdownMenuItem onSelect={onselect} outline>
  {#if tripDetailStore.trip?.archived}
    <span class="Icon">
      <Icon icon="material-symbols:unarchive-outline" />
    </span>
    Unarchive trip
  {:else}
    <span class="Icon">
      <Icon icon="material-symbols:archive-outline" />
    </span>
    Archive trip
  {/if}
</DropdownMenuItem>
