<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
</script>

<Button
  aria-label="Add expense"
  class="TripHeaderCreateExpenseButton"
  variant="text"
  roundness="pill"
  title="Add expense"
  href={`/trips/${tripId}/expenses/add`}
  compact
  color="neutral"
  background="none"
>
  <Icon icon="material-symbols:add-rounded" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripHeaderCreateExpenseButton) {
    font-size: 1.55rem;
  }
</style>
