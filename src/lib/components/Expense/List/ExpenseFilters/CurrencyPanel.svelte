<script lang="ts">
  import TagCheckbox from '$lib/components/ui-framework/Form/TagCheckboxGroup/TagCheckbox.svelte';
  import { getUniqueCurrency, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import PanelItem from './PanelItem.svelte';

  const currencies = $derived(getUniqueCurrency(useExpenseStore.data));

  function onclick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    let currency = useTripsFilterStore.filters.currency || [];
    const name = target.name;

    if (currency.includes(name)) {
      currency = currency.filter((item) => item !== name);
    } else {
      currency.push(name);
    }

    useTripsFilterStore.updateFilters({ currency });
  }
</script>

<PanelItem
  title="Currency"
  onClear={() => useTripsFilterStore.updateFilters({ currency: undefined })}
  disabledClear={useTripsFilterStore.filters.currency?.length ? false : true}
>
  {#each currencies as currency (currency)}
    <TagCheckbox
      name={currency}
      {onclick}
      checked={useTripsFilterStore.filters.currency?.includes(currency)}
    >
      {currency}
    </TagCheckbox>
  {/each}
</PanelItem>
