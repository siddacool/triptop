<script lang="ts">
  import Search from '$lib/components/ui-framework/Form/Search.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
</script>

<div class="SearchExpense">
  <Search
    placeholder="Search expense"
    oninput={(e) =>
      useTripsFilterStore.updateFilters({ searchTerm: (e.target as HTMLInputElement).value })}
    value={useTripsFilterStore.filters.searchTerm}
    onclear={() => useTripsFilterStore.updateFilters({ searchTerm: undefined })}
  />
</div>

<style lang="scss">
  .SearchExpense {
    margin-bottom: 16px;
  }
</style>
