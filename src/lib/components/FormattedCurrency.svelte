<script lang="ts">
  type Props = {
    currency?: string;
    language?: string;
    value: number;
    class?: string;
  };

  const { currency = 'INR', language = 'en-IN', value, class: className = '' }: Props = $props();

  const formattedValue = $derived(
    new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(value),
  );
</script>

<span class={`FormattedCurrency ${className}`}>{formattedValue}</span>

<style lang="ts">
  .FormattedCurrency {
    display: inline-flex;
    font-family: inherit;
  }
</style>
