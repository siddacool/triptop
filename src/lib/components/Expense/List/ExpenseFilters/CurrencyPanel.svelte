<script lang="ts">
  import { page } from '$app/state';
  import TagCheckbox from '$lib/components/ui-framework/Form/TagCheckboxGroup/TagCheckbox.svelte';
  import { getUniqueCurrency, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import PanelItem from './PanelItem.svelte';

  const tripId = page.params.tripId;
  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === tripId));
  const currencies = $derived(getUniqueCurrency(expenses));

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
