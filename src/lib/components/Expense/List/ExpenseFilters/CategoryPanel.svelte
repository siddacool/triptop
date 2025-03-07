<script lang="ts">
  import TagCheckbox from '$lib/components/ui-framework/Form/TagCheckboxGroup/TagCheckbox.svelte';
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import type { Category } from '$lib/stores/expense/types';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import CategoryFormattedOption from '../../CategoryFormattedOption.svelte';
  import PanelItem from './PanelItem.svelte';

  function onclick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    let category = useTripsFilterStore.filters.category || [];
    const name = target.name as Category;

    if (category.includes(name)) {
      category = category.filter((item) => item !== name);
    } else {
      category.push(name);
    }

    useTripsFilterStore.updateFilters({ category });
  }
</script>

<PanelItem title="Category">
  {#each categoryOptions as categoryOption (categoryOption.value)}
    <TagCheckbox
      name={categoryOption.value || 'misc'}
      {onclick}
      checked={useTripsFilterStore.filters.category?.includes(categoryOption.value || 'misc')}
    >
      <CategoryFormattedOption category={categoryOption.value} />
    </TagCheckbox>
  {/each}
</PanelItem>

<style lang="scss">
</style>
