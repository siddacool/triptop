<script lang="ts">
  import { Column } from '@flightlesslabs/dodo-ui';
  import MultiLevelSummary from '$lib/components/ui/Stats/MultiLevelSummary/MultiLevelSummary.svelte';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';

  const expenseSummary = $derived(useTripStatsStore.tripSummary);
  const trip = $derived(useTripStore.trip);
</script>

{#if expenseSummary && trip}
  <Column>
    <MultiLevelSummary
      {expenseSummary}
      {trip}
      level="expert"
      topicTitle=""
      showBasicStats={false}
      class="SummaryMultiLevelSummary"
    />
  </Column>
{/if}

<style lang="scss">
  :global(.SummaryMultiLevelSummary .DetailedStats) {
    margin-top: 0;
  }
</style>
