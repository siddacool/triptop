<script lang="ts">
  import { Column, FormField } from '@flightlesslabs/dodo-ui';
  import { NumericInput } from '@flightlesslabs/dodo-ui-numeric';
  import { NumberFormatStyle } from 'svelte-number-format';
  import { type Trip } from '$lib/stores/trip/types';

  type Props = {
    amount?: number | null;
    disabled?: boolean;
    trip: Trip;
  };

  let { disabled = false, trip, amount = $bindable(null) }: Props = $props();

  const locale = $derived(trip.locale);
</script>

<Column>
  <FormField label="Amount:" for="amount">
    <NumericInput
      bind:value={amount}
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
  </FormField>
</Column>
