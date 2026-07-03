<script lang="ts" module>
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Trip } from '$lib/stores/trip/types';
  import Amount from './Amount.svelte';
  import type { MoneyValue } from '$lib/stores/currency/types';
  import LabelGroup from './LabelGroup.svelte';

  export type MultiLevelSummaryProps = {
    class?: string;
    trip: Trip;
    expenseSummary: ExpenseSummary;
  };
</script>

<script lang="ts">
  let { trip, class: className = '', expenseSummary }: MultiLevelSummaryProps = $props();

  const classes = $derived(['DetailedStats', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Amount {trip} value={expenseSummary.total} label="Total" />
  <Amount {trip} value={expenseSummary.average} label="Average" />
  <Amount {trip} value={expenseSummary.largest as MoneyValue} label="Largest" />
  <LabelGroup label="Expenses">{expenseSummary.expenseCount}</LabelGroup>
</div>

<style lang="scss">
  .DetailedStats {
    width: 100%;
    flex-direction: column;
    margin-top: calc(var(--dodo-ui-space) * -1);
  }
</style>
