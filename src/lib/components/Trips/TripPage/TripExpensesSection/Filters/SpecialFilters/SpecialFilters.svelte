<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Button, Indicator } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import { useTripPageStore } from '$lib/stores/app/pages/trip-page.svelte';
</script>

<div class="SpecialFilters">
  {#if useExpenseFiltersStore.isSpecialFiltersActive}
    <Indicator color="danger" class="SpecialFiltersDot" font-size="1rem" />
  {/if}

  <Button
    class="SpecialFiltersButton"
    roundness="pill"
    outline
    variant="text"
    color="neutral"
    onclick={useTripPageStore.toggleShowSpecailFiltersSelector}
  >
    <Icon icon="mdi:filter-outline" />
  </Button>
</div>

<style lang="scss">
  .SpecialFilters {
    position: relative;
    display: inline-flex;

    :global(.SpecialFiltersButton) {
      font-size: 1.5rem;
    }

    :global(.SpecialFiltersDot) {
      position: absolute;
      top: -4px;
      right: 4px;
    }
  }
</style>
