<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import { Column } from '@flightlesslabs/grid';
  import { getCurrenciesUsed, useExpensesStore } from '$lib/stores/expense/list.svelte';
  import { getCurrencySymbol } from '@flightlesslabs/number-format';
  import type { OptionsPickerOption } from '$lib/ui-lib/OptionsPicker/OptionsPicker.svelte';
  import FormOptionsPicker from '$lib/components/FormOptionsPicker.svelte';

  function onchange(value: string) {
    const oldValue = useExpenseFiltersStore.selectiveFilters.currency || [];
    let newValue: string[] | undefined = oldValue.includes(value)
      ? oldValue.filter((item) => !item.includes(value))
      : [...oldValue, value];

    if (!newValue.length) {
      newValue = undefined;
    }

    useExpenseFiltersStore.updateSelectiveFilters({ currency: newValue });
  }

  const currencies = $derived(getCurrenciesUsed(useExpensesStore.data || []));
  const currencyOptions = $derived(
    currencies.map((item) => Object.assign({ label: item, value: item })),
  ) as OptionsPickerOption[];

  function getCurruncyLabel(value: string) {
    const label = getCurrencySymbol(value, true);

    if (value.toLowerCase() === label.toLowerCase()) {
      return label;
    }

    return `${value} ${label}`;
  }
</script>

<Column>
  <FormOptionsPicker
    options={currencyOptions}
    name="currency"
    value={useExpenseFiltersStore.selectiveFilters.currency || []}
    {onchange}
    onclear={() => useExpenseFiltersStore.updateSelectiveFilters({ currency: undefined })}
    label="Currency:"
  >
    {#snippet tagLabel(option)}
      <span class="option">
        {getCurruncyLabel(option.value)}
      </span>
    {/snippet}
  </FormOptionsPicker>
</Column>

<style lang="scss">
  .option {
    display: inline-flex;
    align-items: center;
  }
</style>
