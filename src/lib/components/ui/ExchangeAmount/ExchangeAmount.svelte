<script lang="ts">
  import { convertCurrency } from '$lib/helpers/convert-currency';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    locale: string;
    amount: number;
    exchangeRate: number;
    currency: CurrencyCode;
  };

  const { class: className = '', amount, exchangeRate, currency, locale }: Props = $props();

  const classes = $derived(['ExchangeAmount', className].filter(Boolean));
  const value = $derived(convertCurrency(amount, exchangeRate));
</script>

<div class={classes.join(' ')}>
  <Money {value} {currency} {locale} />
</div>

<style lang="scss">
  .ExchangeAmount {
    display: inline-flex;
    font-size: inherit;
    color: var(--dodo-color-secondary-500);
  }

  :global(.dodo-theme--dark .ExchangeAmount) {
    color: var(--dodo-color-secondary-600);
  }
</style>
