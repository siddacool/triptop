<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Search } from '@flightlesslabs/dodo-ui';

  let search = $state(useExpenseFiltersStore.searchFilter);

  $effect(() => {
    const value = search;

    const timeout = setTimeout(() => {
      useExpenseFiltersStore.updateSearchFilter(value || '');
    }, 300);

    return () => clearTimeout(timeout);
  });
</script>

<div class="SearchFilter">
  <Search
    placeholder="Search expenses"
    bind:value={search}
    roundness={2}
    clearable
    onclear={() => {
      search = '';
      useExpenseFiltersStore.updateSearchFilter('');
    }}
  />
</div>

<style lang="scss">
  .SearchFilter {
    flex: 1;
    margin-right: var(--dodo-ui-space);
  }
</style>
