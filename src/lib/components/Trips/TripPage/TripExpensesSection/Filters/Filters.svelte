<script>
  import SpecialFilters from './SpecialFilters/SpecialFilters.svelte';
  import SearchFilter from './SearchFilter.svelte';
</script>

<div class="Filters">
  <SearchFilter />
  <SpecialFilters />
</div>

<style lang="scss">
  .Filters {
    margin-top: 0;
    margin-bottom: calc(var(--dodo-ui-space) * 3);
    display: flex;
    width: 100%;
  }
</style>
