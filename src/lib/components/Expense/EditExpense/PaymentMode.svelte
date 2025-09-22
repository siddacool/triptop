<script lang="ts">
  import PaymentModeIcon from '$lib/components/PaymentModeIcon.svelte';
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { PaymentModes, paymentModesOptions } from '$lib/stores/expense/individual.svelte';
  import ChipPicker from '$lib/ui-lib/ChipPicker/ChipPicker.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import { Column } from '@flightlesslabs/grid';

  interface CurrencyProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string) => void;
  }

  const { formData, onchange }: CurrencyProps = $props();
</script>

<Column>
  <FormControl label="Payment Mode:" for="paymentMode">
    <ChipPicker
      name="paymentMode"
      options={paymentModesOptions}
      onchange={(val) => onchange('paymentMode', val)}
      value={formData?.paymentMode || PaymentModes.CASH}
    >
      {#snippet label(option)}
        <span class="option">
          <PaymentModeIcon paymentMode={option.value as PaymentModes} />
          {option.label}
        </span>
      {/snippet}
    </ChipPicker>
  </FormControl>
</Column>

<style lang="scss">
  .option {
    display: inline-flex;
    align-items: center;

    :global(.PaymentModeIcon) {
      margin-right: 4px;
    }
  }
</style>
