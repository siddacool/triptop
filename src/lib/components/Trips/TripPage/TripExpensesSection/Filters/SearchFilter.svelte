<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Search } from '@flightlesslabs/dodo-ui';

  function handleValueChange(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;

    useExpenseFiltersStore.updateSearchFilter(value);
  }
</script>

<div>
  <Search
    placeholder="Search expenses"
    value={useExpenseFiltersStore.searchFilter}
    oninput={handleValueChange}
    roundness={2}
    clearable
    onclear={() => useExpenseFiltersStore.updateSearchFilter('')}
  />
</div>

<style lang="scss">
</style>
