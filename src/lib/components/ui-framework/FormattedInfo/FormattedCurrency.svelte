<script lang="ts">
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';

  type FormattedCurrencyProps = {
    currency?: string;
    value: number;
    class?: string;
  };

  const {
    currency = DEFUALT_CURRENCY.alphabeticCode,
    value,
    class: className = '',
  }: FormattedCurrencyProps = $props();

  const formattedValue = $derived(
    new Intl.NumberFormat(currency === DEFUALT_CURRENCY.alphabeticCode ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(value),
  );
</script>

<span class={`FormattedCurrency ${className}`}>{formattedValue}</span>

<style lang="ts">
  .FormattedCurrency {
    display: inline-flex;
    font-family: inherit;
    color: inherit;
  }
</style>
