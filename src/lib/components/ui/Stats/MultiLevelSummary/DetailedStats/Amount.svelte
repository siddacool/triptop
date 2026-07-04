<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import type { MoneyValue } from '$lib/stores/currency/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';
  import LabelGroup from './LabelGroup.svelte';
  import type { Trip } from '$lib/stores/trip/types';

  type Props = {
    trip: Trip;
    value: MoneyValue;
    class?: string;
    label: string;
  };

  let { class: className = '', value, trip, label }: Props = $props();

  const amount = $derived(value.amount);
  const amountHomeCurrency = $derived(value.amountHomeCurrency);

  const classes = $derived(['MultiStatsGroupAmount', className].filter(Boolean));
</script>

<LabelGroup class={classes.join(' ')} {label}>
  <Threshold value={amount} threshold={0} colorMap={{ above: 'default' }} class="AmountMoney">
    <Money
      value={amount}
      currency={trip.currency || 'USD'}
      locale={trip.locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>

  {#if trip.enableCurrencyConversion !== false}
    <HomeCurrencyExchange amount={amountHomeCurrency} />
  {/if}
</LabelGroup>

<style lang="scss">
  :global(.MultiStatsGroupAmount .AmountMoney) {
    margin-right: var(--dodo-ui-space);
    color: var(--dodo-color-neutral-800);
    font-weight: 400;
  }

  :global(.MultiStatsGroupAmount .HomeCurrencyExchange) {
    font-weight: 400;
  }
</style>
