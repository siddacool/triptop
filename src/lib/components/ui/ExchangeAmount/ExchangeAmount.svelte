<script lang="ts">
  import { convertCurrency } from '$lib/helpers/convert-currency';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import SecondaryCurrency from '../SecondaryCurrency/SecondaryCurrency.svelte';

  type Props = {
    class?: string;
    locale: string;
    amount: number;
    exchangeRate: number;
    currency: CurrencyCode;
  };

  const { class: className = '', amount, exchangeRate, currency, locale }: Props = $props();

  const classes = $derived(['ExchangeAmount', className].filter(Boolean));
  const value = $derived(convertCurrency(amount, exchangeRate));
</script>

<SecondaryCurrency {value} {currency} {locale} class={classes.join(' ')} />
