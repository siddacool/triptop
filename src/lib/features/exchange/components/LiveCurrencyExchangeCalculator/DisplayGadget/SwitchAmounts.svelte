<script lang="ts">
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    activeCurrency: LiveCurrencyExchangeActiveCurrency;
  };

  let { class: className = '', activeCurrency = $bindable() }: Props = $props();

  const classes = $derived(['SwitchAmounts', className].filter(Boolean));

  function handleSwitch() {
    activeCurrency =
      activeCurrency === LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY
        ? LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY
        : LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY;
  }
</script>

<div class={classes.join(' ')}>
  <Button onclick={handleSwitch} roundness="pill" class="SwitchAmountsButton" size="large">
    <Icon icon="basil:exchange-outline" />
  </Button>
</div>

<style lang="scss">
  .SwitchAmounts {
    order: 2;
    :global(.SwitchAmountsButton) {
      font-size: 2rem;
    }

    :global(.SwitchAmountsButton svg) {
      transform: rotate(90deg);
    }
  }
</style>
