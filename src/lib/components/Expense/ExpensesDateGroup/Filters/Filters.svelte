<script lang="ts">
  import SearchFilter from './SearchFilter.svelte';
  import SelectiveFilters from './SelectiveFilters';
</script>

<div class="Filters">
  <SearchFilter />
  <SelectiveFilters />
</div>

<style lang="scss">
  .Filters {
    margin-bottom: 18px;
    display: flex;
    align-items: center;
  }
</style>
