<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trips/EditTrip/EditTrip.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { useEditTripStore } from '$lib/stores/trip/edit.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';
  import type { EditTripFormData } from '$lib/stores/trip/types';
  import { Button, Column, Grid } from '@flightlesslabs/dodo-ui';
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

      useHistoricalCurrencyExchangeStore.clear();

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

      await useTripListStore.fetch();

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

  async function toggleArchive(archiveCondition: boolean) {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;
      await useEditTripStore.toggleArchived(tripId, archiveCondition);

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Trip archived' : 'Trip unarchived',
        color: 'primary',
      });

      await useTripListStore.fetch();

      await goto(resolve('/trips'));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: archiveCondition ? 'Failed to archived trip' : 'Failed to unarchived trip',
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

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive Trip',
      description: 'Are you sure you want to archive this trip?',
      onaccept: () => toggleArchive(true),
    });
  }
</script>

<svelte:head>
  <title>Edit trip</title>
</svelte:head>

<WhiteMaterial>
  <Box>
    {#if useTripStore.fetching}
      <Loading />
    {:else if useTripStore.trip}
      <Grid gap={2}>
        <Column>
          <div>
            <PageHeadingNav class="TripHeader" href={`/trips/${tripId}`}>Edit trip</PageHeadingNav>
            <EditTrip
              data={useTripStore.trip}
              mode="edit"
              onsubmit={updateTrip}
              disabled={fetching}
            />
          </div>
        </Column>
        <Column>
          <Divider />
        </Column>
        <Column>
          <ControlSection class="TripEditControls" controlsAlignment="center">
            <Button color="danger" onclick={deleteConfirmation}>Delete trip</Button>

            {#if useTripStore.trip.archived}
              <Button onclick={() => toggleArchive(false)}>Unarchive trip</Button>
            {:else}
              <Button color="neutral" onclick={archiveConfirmation}>Archive trip</Button>
            {/if}
          </ControlSection>
        </Column>
      </Grid>
    {/if}
  </Box>
</WhiteMaterial>
