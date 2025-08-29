<script lang="ts">
  interface FormattedCurrencyProps {
    value: number;
    class?: string;
    currency?: string;
  }

  const { value, class: className = '', currency }: FormattedCurrencyProps = $props();

  const formattedValue = $derived(
    currency
      ? new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
          style: 'currency',
          currency: currency,
        }).format(value)
      : value,
  );
</script>

<span class={['FormattedCurrency', className].join(' ')}>{formattedValue}</span>

<style lang="scss">
  .FormattedCurrency {
    display: inline-flex;
    font-family: inherit;
    color: inherit;
  }
</style>
