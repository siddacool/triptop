<script>
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;
</script>

<Button
  href={resolve(`/trips/${tripId}/expenses/add`)}
  roundness="full"
  class="TripPageAddExpense"
  aria-label="Add expense"
  title="Add expense"
  compact
  size="large"
>
  <Icon icon="material-symbols:add-rounded" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--large.TripPageAddExpense) {
    font-size: 2rem;
  }
</style>
