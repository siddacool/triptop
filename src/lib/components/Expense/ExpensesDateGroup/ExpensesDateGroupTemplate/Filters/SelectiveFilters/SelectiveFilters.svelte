<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Icon from '@iconify/svelte';
  import SelectiveFiltersModal from './SelectiveFiltersModal/SelectiveFiltersModal.svelte';
  import FilterActiveDot from '$lib/components/FilterActiveDot.svelte';

  let openSelectiveFiltersModal = $state(false);

  function openModal() {
    openSelectiveFiltersModal = true;
  }

  function closeModal() {
    openSelectiveFiltersModal = false;
  }
</script>

<SelectiveFiltersModal bind:open={openSelectiveFiltersModal} onClose={closeModal} />

<div class="SelectiveFilters">
  <Button
    compact
    aria-label={useExpenseFiltersStore.isAnySelectiveFilters
      ? 'Selective Filters: Active'
      : 'Selective Filters'}
    class="FilterButton"
    onclick={openModal}
  >
    <Icon icon="material-symbols:filter-alt" width="24" height="24" />
    <FilterActiveDot show={useExpenseFiltersStore.isAnySelectiveFilters} />
  </Button>
</div>

<style lang="scss">
  .SelectiveFilters {
    :global(.FilterButton) {
      position: relative;
    }

    :global(.FilterActiveDot) {
      position: absolute;
      top: 0px;
      right: -3px;
      width: 0.8rem;
      height: 0.8rem;
    }
  }
</style>
