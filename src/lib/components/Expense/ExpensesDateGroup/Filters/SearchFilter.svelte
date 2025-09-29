<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import Search from '$lib/ui-lib/Search/Search.svelte';

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    useExpenseFiltersStore.updateFilters({ search: target.value || '' });
  }
</script>

<div class="SearchFilter">
  <Search
    placeholder="Search expenses"
    value={useExpenseFiltersStore.filters.search || ''}
    onclear={() => useExpenseFiltersStore.updateFilters({ search: '' })}
    {oninput}
  />
</div>

<style lang="scss">
</style>
