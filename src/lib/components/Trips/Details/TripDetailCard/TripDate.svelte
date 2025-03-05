<script lang="ts">
  import { page } from '$app/state';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Heading from './Heading.svelte';

  const tripId = page.params.tripId;
  const startDate = $derived(useTripsStore.data.find((item) => item._id === tripId)?.startDate);
  const endDate = $derived(useTripsStore.data.find((item) => item._id === tripId)?.endDate);
</script>

<div class="TripDate">
  <Stack space={1}>
    <StackItem>
      <Heading title="Date" />
    </StackItem>
    <StackItem>
      <section>
        {startDate ? getMoment(startDate).format('MMM D') : ''} - {endDate
          ? getMoment(endDate).format('MMM D YYYY')
          : ''}
      </section>
    </StackItem>
  </Stack>
</div>

<style lang="scss">
  .TripDate {
    padding: 16px 16px;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
  }
</style>
