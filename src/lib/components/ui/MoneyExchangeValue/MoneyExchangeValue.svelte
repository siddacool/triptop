<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import BaseMoneyExchangeValue from './BaseMoneyExchangeValue.svelte';

  type Props = {
    class?: string;
    locale: string;
    value?: number;
    currency: CurrencyCode;
  };

  const { class: className = '', value, currency, locale }: Props = $props();

  const classes = $derived(['MoneyExchangeValue', className].filter(Boolean));
</script>

{#if value || value === 0}
  <div class={classes.join(' ')}>
    <BaseMoneyExchangeValue {value} {currency} {locale} />
  </div>
{/if}

<style lang="scss">
  .MoneyExchangeValue {
    display: inline-flex;
    font-size: inherit;
    color: var(--dodo-color-secondary-500);
  }

  :global(.dodo-theme--dark .MoneyExchangeValue) {
    color: var(--dodo-color-secondary-600);
  }
</style>
