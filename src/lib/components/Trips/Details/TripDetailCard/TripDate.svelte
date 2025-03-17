<script lang="ts">
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import Heading from './Heading.svelte';

  const startDate = $derived(useTripByIdStore.data?.startDate);
  const endDate = $derived(useTripByIdStore.data?.endDate);
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
