<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
</script>

<Button
  aria-label="Edit trip"
  class="TripPageEditTrip"
  variant="text"
  roundness="full"
  title="Edit trip"
  href={resolve(`/trips/${tripId}/edit`)}
  compact
  color="neutral"
  background="none"
>
  <Icon icon="material-symbols:edit-outline" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageEditTrip) {
    font-size: 1.4rem;
  }
</style>
