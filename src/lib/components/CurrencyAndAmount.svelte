<script lang="ts">
  import FormattedCurrency from './FormattedCurrency.svelte';

  interface CurrencyAndAmountProps {
    currency?: string;
    amount: number;
  }

  const { currency, amount }: CurrencyAndAmountProps = $props();
</script>

<div class="CurrencyAndAmount">
  {#if currency}
    <div class="Currency">{currency}</div>
  {/if}

  <div class="Amount"><FormattedCurrency value={amount} {currency} /></div>
</div>

<style lang="scss">
  .CurrencyAndAmount {
    .Currency {
      font-size: 1rem;
      margin-bottom: 4px;
    }

    .Amount {
      font-size: 1.3rem;
      font-weight: 500;
      letter-spacing: 0.3px;
      color: var(--dodo-color-primary-700);
    }
  }
</style>
