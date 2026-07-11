<script lang="ts">
  import {
    clearExpenseSearchFilter,
    updateExpenseSearchFilter,
  } from '$lib/features/expense/logic/filters.svelte';
  import { expenseFiltersStore } from '$lib/features/expense/store/filters.svelte';
  import { Search } from '@flightlesslabs/dodo-ui';

  let search = $state(expenseFiltersStore.filters.search);

  $effect(() => {
    const value = search;

    const timeout = setTimeout(() => {
      updateExpenseSearchFilter(value || '');
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
    name="search-expense"
    onclear={() => {
      search = '';
      clearExpenseSearchFilter();
    }}
  />
</div>

<style lang="scss">
  .SearchFilter {
    flex: 1;
    margin-right: var(--dodo-ui-space);
  }
</style>
