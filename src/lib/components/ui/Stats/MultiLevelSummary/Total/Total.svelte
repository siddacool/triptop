<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Trip } from '$lib/stores/trip/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    trip: Trip;
    expenseSummary: ExpenseSummary;
  };

  let { class: className = '', trip, expenseSummary }: Props = $props();

  const classes = $derived(['MultiLevelSummaryTotal', className].filter(Boolean));
  const amount = $derived(expenseSummary.total.amount);
  const amountHomeCurrency = $derived(expenseSummary.total.amountHomeCurrency);
</script>

<div class={classes.join(' ')}>
  <Threshold value={amount} threshold={0} colorMap={{ above: 'default' }} class="AmountMoney">
    <Money
      value={amount}
      currency={trip?.currency || 'USD'}
      locale={trip?.locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>

  {#if trip.enableCurrencyConversion !== false}
    <HomeCurrencyExchange amount={amountHomeCurrency} />
  {/if}
</div>

<style lang="scss">
  .MultiLevelSummaryTotal {
    margin-top: calc(var(--dodo-ui-space) * 1);
  }

  :global(.MultiLevelSummaryTotal .AmountMoney) {
    margin-right: calc(var(--dodo-ui-space) * 1);
    color: var(--dodo-color-neutral-800);
    font-weight: 400;
    font-size: 0.9rem;
  }

  :global(.MultiLevelSummaryTotal .HomeCurrencyExchange) {
    font-weight: 400;
    font-size: 0.9rem;
  }
</style>
