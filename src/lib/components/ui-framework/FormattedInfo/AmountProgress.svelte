<script lang="ts">
  import { calculatePercentage } from '$lib/helpers/percentage';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import FormattedCurrency from './FormattedCurrency.svelte';

  type AmountProgressAmount = {
    currency?: string;
    total: number;
    usedAmount: number;
  };

  const {
    currency = DEFUALT_CURRENCY.alphabeticCode,
    total,
    usedAmount,
  }: AmountProgressAmount = $props();

  const remainingAmount = $derived(total - usedAmount);

  const remainingAmountPercentage = $derived(calculatePercentage(remainingAmount, total));
  const usedAmountPercentage = $derived(calculatePercentage(usedAmount, total));
</script>

<div class="AmountProgress">
  <div class="Progress">
    <div class="used" style={`width:${usedAmountPercentage}%`}></div>
    <div class="separator"></div>
    <div class="remaining" style={`width:${remainingAmountPercentage}%`}></div>
  </div>
  <div class="Amount">
    <FormattedCurrency class="used" value={usedAmount} {currency} />
    <FormattedCurrency class="remaining" value={remainingAmount} {currency} />
  </div>
</div>

<style lang="scss">
  .AmountProgress {
    text-decoration: none;
    font-size: inherit;
    width: 100%;

    .Progress {
      display: flex;
      width: 100%;
      border-radius: 7px;
      overflow: hidden;
      height: 5px;

      .separator {
        width: 2px;
      }

      .used {
        background-color: var(--color-danger-500);
      }

      .remaining {
        background-color: var(--color-safe-500);
        flex: 1;
      }
    }

    .Amount {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      font-weight: 400;

      :global(.used) {
        color: var(--color-danger-700);
      }

      :global(.remaining) {
        color: var(--color-safe-700);
      }
    }
  }
</style>
