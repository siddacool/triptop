<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditTrip from '$lib/features/trip/components/EditTrip/EditTrip.svelte';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import type { TripCreateData, Trip } from '../../types';
  import { saveTrip } from '../../logic/crud.svelte';
  import { tripDetailStore } from '../../store/detail.svelte';
  import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;

  async function updateTrip(data: TripCreateData) {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;

      await saveTrip(data);

      toasts.add({
        title: 'Successs',
        description: 'Trip details updated',
        color: 'primary',
      });

      historicalRatesExchangeStore.clear();

      goto(resolve(`/trips/${tripId}`));
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

<EditTrip
  data={tripDetailStore.trip as Trip}
  mode="edit"
  onsubmit={updateTrip}
  disabled={fetching}
/>
