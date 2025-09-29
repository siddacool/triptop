<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import { Column } from '@flightlesslabs/grid';
  import FormTagPicker from '$lib/components/FormTagPicker.svelte';
  import { getCurrenciesUsed, useExpensesStore } from '$lib/stores/expense/list.svelte';
  import type { TagPickerOption } from '$lib/ui-lib/TagPicker/TagPicker.svelte';
  import { getCurrencySymbol } from '@flightlesslabs/number-format';

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
  ) as TagPickerOption[];
</script>

<Column>
  <FormTagPicker
    options={currencyOptions}
    name="currency"
    value={useExpenseFiltersStore.selectiveFilters.currency || []}
    {onchange}
    onclear={() => useExpenseFiltersStore.updateSelectiveFilters({ currency: undefined })}
    label="Currency:"
  >
    {#snippet tagLabel(option)}
      <span class="option">
        {option.label}
        {#if option.label.toLowerCase() !== getCurrencySymbol(option.value, true).toLowerCase()}
          ({getCurrencySymbol(option.value, true)})
        {/if}
      </span>
    {/snippet}
  </FormTagPicker>
</Column>

<style lang="scss">
  .option {
    display: inline-flex;
    align-items: center;
  }
</style>
