<script>
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import PrimaryButton from '$lib/components/ui/Buttons/PrimaryButton/PrimaryButton.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;
</script>

<PrimaryButton
  href={resolve(`/trips/${tripId}/expenses/add`)}
  roundness="full"
  class="TripPageAddExpense dodo-shadow-2"
  aria-label="Add expense"
  title="Add expense"
  compact
  size="large"
>
  <Icon icon="material-symbols:add-rounded" />
</PrimaryButton>

<style lang="scss">
  :global(.dodo-ui-Button.size--large.TripPageAddExpense) {
    font-size: 2rem;
  }
</style>
