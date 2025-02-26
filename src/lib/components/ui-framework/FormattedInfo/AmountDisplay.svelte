<script lang="ts">
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import FormattedCurrency from './FormattedCurrency.svelte';

  type AmountDisplayProps = {
    currency?: string;
    value: number;
  };

  const { currency = DEFUALT_CURRENCY.alphabeticCode, value }: AmountDisplayProps = $props();
</script>

<article class="AmountDisplay">
  <section>{currency}</section>
  <section>
    <FormattedCurrency {value} {currency} />
  </section>
</article>

<style lang="scss">
  section {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--color-grey-font-600);

    &:last-child {
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--color-grey-font-800);
    }
  }
</style>
