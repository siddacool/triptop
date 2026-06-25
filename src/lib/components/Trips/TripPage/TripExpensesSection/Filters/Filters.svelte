<script>
  import SpecialFilters from './SpecialFilters/SpecialFilters.svelte';
  import SearchFilter from './SearchFilter.svelte';
</script>

<div class="TripExpensesSectionFilters">
  <SearchFilter />
  <SpecialFilters />
</div>

<style lang="scss">
  .TripExpensesSectionFilters {
    margin-top: calc(var(--dodo-ui-space) * -2);
    margin-bottom: calc(var(--dodo-ui-space) * 1);
    padding: calc(var(--dodo-ui-space) * 2) 0;
    display: flex;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;

    background: linear-gradient(
      to bottom,
      var(--dodo-color-neutral-100) 0%,
      var(--dodo-color-neutral-100) 80%,
      transparent 100%
    );
  }

  :global(.dodo-theme--dark .TripExpensesSectionFilters) {
    background: linear-gradient(
      to bottom,
      var(--dodo-color-neutral-50) 0%,
      var(--dodo-color-neutral-50) 80%,
      transparent 100%
    );
  }
</style>
