<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
</script>

<Button
  aria-label="Trip settings"
  class="TripPageEditTrip"
  variant="text"
  roundness="pill"
  title="Trip settings"
  href={resolve(`/trips/${tripId}/edit`)}
  outline
>
  <Icon icon="material-symbols:settings-outline-rounded" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageEditTrip) {
    font-size: 1.5rem;
  }
</style>
