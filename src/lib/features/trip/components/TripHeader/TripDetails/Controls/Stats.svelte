<script>
  import { page } from '$app/state';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
</script>

{#if expenseListStore.expenses.length}
  <Button
    aria-label="Trip statistics"
    class="TripStatsButton"
    variant="text"
    roundness="full"
    title="Trip statistics"
    compact
    href={`/trips/${tripId}/stats`}
  >
    <Icon icon="ic:round-bar-chart" />
  </Button>
{/if}

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripStatsButton) {
    font-size: 1.5rem;
  }
</style>
