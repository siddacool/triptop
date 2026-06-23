<script lang="ts">
  import { Column, FormField, Money } from '@flightlesslabs/dodo-ui';
  import { NumericInput } from '@flightlesslabs/dodo-ui-numeric';
  import { NumberFormatStyle } from 'svelte-number-format';
  import { type Trip } from '$lib/stores/trip/types';
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { parseNumeric } from '$lib/helpers/parse-numeric';
  import { useCurrencyExchangeStore } from '$lib/stores/currency/exchange.svelte';

  type Props = {
    amount?: number | null;
    disabled?: boolean;
    trip: Trip;
  };

  let { disabled = false, trip, amount = $bindable(null) }: Props = $props();

  const locale = $derived(trip.locale);
  let amountInputValue: number | null = $derived(amount);

  const isShowCurrencyExchange = $derived(
    useCurrencyExchangeStore.exchangeRate && !useCurrencyExchangeStore.fetching ? true : false,
  );

  function oninput(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;

    amountInputValue = parseNumeric(value);
  }
</script>

{#snippet basicExchangeRate()}
  <Money value={1} currency={trip.currency} /> = <HomeCurrencyExchange amount={1} />
{/snippet}

<Column>
  <FormField label="Amount:" for="amount">
    <NumericInput
      bind:value={amount}
      {oninput}
      name="amount"
      {disabled}
      {locale}
      options={{
        formatStyle: NumberFormatStyle.Currency,
        currency: trip.currency,
        precision: 2,
      }}
      size="large"
      placeholder="0.00"
    />

    {#if isShowCurrencyExchange}
      <FieldMessage size="small">
        {#if amountInputValue}
          <b><HomeCurrencyExchange amount={amountInputValue} /></b> ({@render basicExchangeRate()})
        {:else}
          {@render basicExchangeRate()}
        {/if}
      </FieldMessage>
    {/if}
  </FormField>
</Column>
