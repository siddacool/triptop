<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Search } from '@flightlesslabs/dodo-ui';

  function handleValueChange(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;

    useExpenseFiltersStore.updateSearchFilter(value);
  }
</script>

<div class="SearchFilter">
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
  .SearchFilter {
    flex: 1;
    margin-right: calc(var(--dodo-ui-space) * 1);
  }
</style>
