<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    currency: CurrencyCode;
    value: number;
    locale: string | undefined;
    isActive?: boolean;
    originalAmount: string;
  };

  const {
    class: className = '',
    currency,
    value,
    locale,
    isActive = false,
    originalAmount,
  }: Props = $props();

  const classes = $derived(
    ['LiveCurrencyExchangeCalculatorScreenAmount', className].filter(Boolean),
  );

  function fractionCheck(active: boolean, amountString: string, isEndsWithDecimal: boolean) {
    if (!active) {
      return 4;
    }

    return active && amountString.includes('.') && !isEndsWithDecimal ? 4 : 0;
  }

  const endsWithDecimal = $derived(originalAmount.endsWith('.'));
  const maximumFractionDigits = $derived(fractionCheck(isActive, originalAmount, endsWithDecimal));
</script>

{#snippet fakeDecimal()}
  {#if isActive && endsWithDecimal}
    .
  {/if}
{/snippet}

<Threshold
  {value}
  threshold={-1}
  colorMap={{ above: isActive ? 'primary' : 'default' }}
  class={classes.join(' ')}
>
  <Money {value} {currency} {locale} options={{ maximumFractionDigits }} />
  {@render fakeDecimal()}
</Threshold>

<style>
  :global(.LiveCurrencyExchangeCalculatorScreenAmount) {
    font-size: 1.2rem;
    font-weight: 400;
    width: 100%;
    overflow-x: auto;
    text-align: right;
    color: inherit;

    @media (min-width: 400px) {
      font-size: 1.6rem;
    }
  }
</style>
