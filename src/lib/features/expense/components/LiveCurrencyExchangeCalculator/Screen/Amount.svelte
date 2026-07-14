<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    currency: CurrencyCode;
    value: number;
    locale: string | undefined;
  };

  const { class: className = '', currency, value, locale }: Props = $props();

  const classes = $derived(
    ['LiveCurrencyExchangeCalculatorScreenAmount', className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  <Money {value} {currency} {locale} options={{ maximumFractionDigits: 2 }} />
</div>

<style>
  :global(.LiveCurrencyExchangeCalculatorScreenAmount) {
    font-size: 1.1rem;
    font-weight: 500;
    color: inherit;
  }
</style>
