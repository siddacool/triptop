<script lang="ts">
  import { Button, Indicator } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import { expenseFiltersStore } from '$lib/features/expense/store/filters.svelte';
  import { tripPageStore } from '$lib/features/trip/store/page.svelte';
  import { updateTripPageSpecialFiltersSelector } from '$lib/features/trip/logic/page.svelte';

  async function handleClick() {
    const filterSelectorCondition = !tripPageStore.showSpecialFiltersSelector;

    updateTripPageSpecialFiltersSelector(filterSelectorCondition);

    const element = document.getElementById('TripExpensesSection');

    if (element && filterSelectorCondition) {
      element.scrollIntoView({
        behavior: 'smooth', // optional
        block: 'start', // top of element aligns with top of viewport
      });
    }
  }
</script>

<div class="SpecialFilters">
  {#if expenseFiltersStore.isSpecialFiltersActive}
    <Indicator color="danger" class="SpecialFiltersDot" font-size="1rem" />
  {/if}

  <Button
    class="SpecialFiltersButton"
    roundness="pill"
    outline
    variant="text"
    color="neutral"
    onclick={handleClick}
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
