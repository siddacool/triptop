<script lang="ts">
  import { Column } from '@flightlesslabs/dodo-ui';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import MultiLevelSummary from '../../MultiLevelSummary/MultiLevelSummary.svelte';

  const expenseSummary = $derived(useTripStatsStore.tripSummary);
  const trip = $derived(tripDetailStore.trip);
</script>

{#if expenseSummary && trip}
  <Column>
    <MultiLevelSummary
      {expenseSummary}
      {trip}
      level="expert"
      topicTitle=""
      class="SummaryMultiLevelSummary"
    />
  </Column>
{/if}

<style lang="scss">
  :global(.SummaryMultiLevelSummary .DetailedStats) {
    margin-top: calc(var(--dodo-ui-space) * -1);
  }

  :global(.SummaryMultiLevelSummary .BasicInfo) {
    display: none;
  }

  :global(.SummaryMultiLevelSummary .Share) {
    display: none;
  }
</style>
