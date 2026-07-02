<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { useEditTripStore } from '$lib/stores/trip/edit.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';

  const tripId = page.params.tripId || '';

  async function toggleArchive(archiveCondition: boolean) {
    try {
      if (!tripId) {
        return;
      }

      await useEditTripStore.toggleArchived(tripId, archiveCondition);

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Trip archived' : 'Trip unarchived',
        color: 'primary',
      });

      await useTripStore.fetch(tripId);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: archiveCondition ? 'Failed to archived trip' : 'Failed to unarchived trip',
        description: message,
        color: 'danger',
      });
    }
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive Trip',
      description: 'Are you sure you want to archive this trip?',
      onaccept: () => toggleArchive(true),
    });
  }

  function onselect() {
    const archiveState = useTripStore.trip?.archived || false;
    const archiveCondition = !archiveState;

    if (archiveCondition) {
      archiveConfirmation();
      return;
    }

    toggleArchive(false);
  }
</script>

<DropdownMenuItem onSelect={onselect} outline>
  {#if useTripStore.trip?.archived}
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
