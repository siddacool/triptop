<script lang="ts">
  import TagCheckbox from '$lib/components/ui-framework/Form/TagCheckboxGroup/TagCheckbox.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import PanelItem from './PanelItem.svelte';

  function onclick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    let budget = useTripsFilterStore.filters.budget || [];
    const name = target.name;

    if (budget.includes(name)) {
      budget = budget.filter((item) => item !== name);
    } else {
      budget.push(name);
    }

    useTripsFilterStore.updateFilters({ budget });
  }
</script>

<PanelItem
  title="Budget"
  onClear={() => useTripsFilterStore.updateFilters({ budget: undefined })}
  disabledClear={useTripsFilterStore.filters.budget?.length ? false : true}
>
  {#each useBudgetStore.data as budget (budget._id)}
    <TagCheckbox
      name={budget._id}
      {onclick}
      checked={useTripsFilterStore.filters.budget?.includes(budget._id)}
    >
      {budget.name}
    </TagCheckbox>
  {/each}

  <TagCheckbox
    name="other"
    {onclick}
    checked={useTripsFilterStore.filters.budget?.includes('other')}
  >
    Other
  </TagCheckbox>
</PanelItem>
