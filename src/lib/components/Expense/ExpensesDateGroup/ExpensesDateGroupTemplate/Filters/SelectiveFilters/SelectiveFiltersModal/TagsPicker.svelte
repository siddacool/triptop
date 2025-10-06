<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import { Column } from '@flightlesslabs/grid';
  import { getExpenseTags, useExpensesStore } from '$lib/stores/expense/list.svelte';
  import type { OptionsPickerOption } from '$lib/ui-lib/OptionsPicker/OptionsPicker.svelte';
  import FormOptionsPicker from '$lib/components/FormOptionsPicker.svelte';

  function onchange(value: string) {
    const oldValue = useExpenseFiltersStore.selectiveFilters.tags || [];
    let newValue: string[] | undefined = oldValue.includes(value)
      ? oldValue.filter((item) => !item.includes(value))
      : [...oldValue, value];

    if (!newValue.length) {
      newValue = undefined;
    }

    useExpenseFiltersStore.updateSelectiveFilters({ tags: newValue });
  }

  const tags = $derived(getExpenseTags(useExpensesStore.data || []));
  const tagsOptions = $derived(
    tags.map((item) => Object.assign({ label: item, value: item })),
  ) as OptionsPickerOption[];
</script>

{#if tagsOptions.length}
  <Column>
    <FormOptionsPicker
      options={tagsOptions}
      name="tags"
      value={useExpenseFiltersStore.selectiveFilters.tags || []}
      {onchange}
      onclear={() => useExpenseFiltersStore.updateSelectiveFilters({ tags: undefined })}
      label="Tags:"
    />
  </Column>
{/if}
