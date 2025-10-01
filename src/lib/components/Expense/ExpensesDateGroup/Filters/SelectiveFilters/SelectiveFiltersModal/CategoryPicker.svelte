<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import { Category, categoryOptions } from '$lib/stores/expense/individual.svelte';
  import { Column } from '@flightlesslabs/grid';
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import FormOptionsPicker from '$lib/components/FormOptionsPicker.svelte';

  function onchange(value: string) {
    const oldValue = useExpenseFiltersStore.selectiveFilters.category || [];
    let newValue: Category[] | undefined = oldValue.includes(value as Category)
      ? oldValue.filter((item) => !item.includes(value as Category))
      : [...oldValue, value as Category];

    if (!newValue.length) {
      newValue = undefined;
    }

    useExpenseFiltersStore.updateSelectiveFilters({ category: newValue });
  }
</script>

<Column>
  <FormOptionsPicker
    options={categoryOptions}
    name="category"
    value={useExpenseFiltersStore.selectiveFilters.category || []}
    {onchange}
    onclear={() => useExpenseFiltersStore.updateSelectiveFilters({ category: undefined })}
    label="Category:"
  >
    {#snippet tagLabel(option)}
      <span class="option">
        <CategoryIcon category={option.value as Category} />
        {option.label}
      </span>
    {/snippet}
  </FormOptionsPicker>
</Column>

<style lang="scss">
  .option {
    display: inline-flex;
    align-items: center;

    :global(.CategoryIcon) {
      margin-right: 4px;
    }
  }
</style>
