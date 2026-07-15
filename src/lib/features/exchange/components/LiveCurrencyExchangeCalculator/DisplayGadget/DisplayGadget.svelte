<script lang="ts">
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import Screen from './Screen/Screen.svelte';
  import { dynamicCurrencyConverter } from '$lib/features/exchange/utils/dynamic-currency-converter';
  import SwitchAmounts from './SwitchAmounts.svelte';

  type Props = {
    class?: string;
    activeCurrency: LiveCurrencyExchangeActiveCurrency;
    exchangeRate: number;
    amount: string;
    homeCurrency: CurrencyCode;
    homeCurrencyLocale: string | undefined;
    tripCurrency: CurrencyCode;
    tripCurrencyLocale: string | undefined;
  };

  let {
    class: className = '',
    homeCurrency,
    exchangeRate,
    activeCurrency = $bindable(),
    amount,
    homeCurrencyLocale,
    tripCurrency,
    tripCurrencyLocale,
  }: Props = $props();

  const classes = $derived(
    ['AmountsGadget', `activeCurrency--${activeCurrency}`, className].filter(Boolean),
  );

  const tripCurrencyAmount = $derived(
    dynamicCurrencyConverter(
      LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
      activeCurrency,
      Number(amount),
      exchangeRate,
    ),
  );

  const homeCurrencyAmount = $derived(
    dynamicCurrencyConverter(
      LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY,
      activeCurrency,
      Number(amount),
      exchangeRate,
    ),
  );
</script>

<div class={classes.join(' ')}>
  <Screen
    class="tripCurrencyValue"
    locale={tripCurrencyLocale}
    currency={tripCurrency}
    amount={homeCurrencyAmount}
    originalAmount={amount}
    isActive={activeCurrency === LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY}
  />
  <SwitchAmounts bind:activeCurrency />
  <Screen
    class="homeCurrencyValue"
    locale={homeCurrencyLocale}
    currency={homeCurrency}
    amount={tripCurrencyAmount}
    originalAmount={amount}
    isActive={activeCurrency === LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY}
  />
</div>

<style lang="scss">
  .AmountsGadget {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: calc(var(--dodo-ui-space) * -2);
    flex: 1;

    &.activeCurrency--HOME_CURRENCY {
      :global(.homeCurrencyValue) {
        order: 1;
      }

      :global(.tripCurrencyValue) {
        order: 3;
      }
    }

    &.activeCurrency--TRIP_CURRENCY {
      :global(.tripCurrencyValue) {
        order: 1;
      }

      :global(.homeCurrencyValue) {
        order: 3;
      }
    }
  }
</style>
