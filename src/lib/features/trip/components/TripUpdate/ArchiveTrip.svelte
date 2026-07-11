<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import { tripDetailStore } from '../../store/detail.svelte';
  import { archiveTrip, unarchiveTrip } from '../../logic/crud.svelte';

  const tripId = page.params.tripId;
  let fetching: boolean = $state(false);

  async function hnadleArchiveTrip(archiveState: boolean) {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;

      if (archiveState) {
        await archiveTrip(tripId);
      } else {
        await unarchiveTrip(tripId);
      }

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

      fetching = false;
    }
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive Trip',
      description: 'Are you sure you want to archive this trip?',
      onaccept: () => hnadleArchiveTrip(true),
    });
  }
</script>

{#if tripDetailStore?.trip?.archived}
  <Button onclick={() => hnadleArchiveTrip(false)} disabled={fetching}>Unarchive trip</Button>
{:else}
  <Button color="neutral" onclick={archiveConfirmation} disabled={fetching}>Archive trip</Button>
{/if}
