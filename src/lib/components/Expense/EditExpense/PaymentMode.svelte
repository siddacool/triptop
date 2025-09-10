<script lang="ts">
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { PaymentModes } from '$lib/stores/expense/individual.svelte';
  import ButtonToggle from '$lib/ui-lib/ButtonToggle';
  import { Column } from '@flightlesslabs/grid';

  interface CurrencyProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string) => void;
  }

  const { formData, onchange }: CurrencyProps = $props();

  const options = [
    {
      value: PaymentModes.CASH,
      label: 'Cash',
    },
    {
      value: PaymentModes.CARD,
      label: 'Card',
    },
  ];
</script>

<Column>
  <ButtonToggle
    name="paymentMode"
    {options}
    value={formData?.paymentMode || PaymentModes.CASH}
    onchange={(val) => onchange('paymentMode', val)}
  />
</Column>

<style lang="scss">
</style>
