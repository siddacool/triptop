<script lang="ts">
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import FormattedCurrency from './FormattedCurrency.svelte';

  type RemainingAmount = {
    currency?: string;
    total: number;
    usedAmount: number;
  };

  const { currency = DEFUALT_CURRENCY.alphabeticCode, total, usedAmount }: RemainingAmount = $props();

  const remainingAmount = $derived(total - usedAmount);
</script>

<div class="RemainingAmount">
  <FormattedCurrency
    value={remainingAmount}
    {currency}
    class={`remaining remaining--${remainingAmount >= 0 ? 'positive' : 'negative'}`}
  /> / <FormattedCurrency value={total} {currency} class="total" />
</div>

<style lang="scss">
  .RemainingAmount {
    display: flex;
    text-decoration: none;
    font-size: inherit;

    :global(.FormattedCurrency) {
      margin: 0 4px;
    }

    :global(.remaining) {
      color: var(--color-primary-800);
    }

    :global(.remaining--negative) {
      color: var(--color-danger-800);
    }

    :global(.total) {
      color: var(--color-grey-font-800);
      font-weight: 600;
    }
  }
</style>
