<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import { PaymentModes, paymentModesOptions } from '$lib/stores/expense/individual.svelte';
  import { Column } from '@flightlesslabs/grid';
  import PaymentModeIcon from '$lib/components/PaymentModeIcon.svelte';
  import FormOptionsPicker from '$lib/components/FormOptionsPicker.svelte';

  function onchange(value: string) {
    const oldValue = useExpenseFiltersStore.selectiveFilters.paymentMode || [];
    let newValue: PaymentModes[] | undefined = oldValue.includes(value as PaymentModes)
      ? oldValue.filter((item) => !item.includes(value as PaymentModes))
      : [...oldValue, value as PaymentModes];

    if (!newValue.length) {
      newValue = undefined;
    }

    useExpenseFiltersStore.updateSelectiveFilters({ paymentMode: newValue });
  }
</script>

<Column>
  <FormOptionsPicker
    options={paymentModesOptions}
    name="paymentMode"
    value={useExpenseFiltersStore.selectiveFilters.paymentMode || []}
    {onchange}
    onclear={() => useExpenseFiltersStore.updateSelectiveFilters({ paymentMode: undefined })}
    label="Payment Mode:"
  >
    {#snippet tagLabel(option)}
      <span class="option">
        <PaymentModeIcon paymentMode={option.value as PaymentModes} />
        {option.label}
      </span>
    {/snippet}
  </FormOptionsPicker>
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
