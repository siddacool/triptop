<script>
  import ExpenseFilter from '$lib/components/Expenses/ExpenseFilter/ExpenseFilter.svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Button, Indicator } from '@flightlesslabs/dodo-ui';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  let openModal = $state(false);
</script>

<Modal bind:open={openModal} title="Expense filters" min-width="500px" max-width="500px">
  <ExpenseFilter onclear={() => (openModal = false)} onconfirm={() => (openModal = false)} />
</Modal>

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
    onclick={() => (openModal = true)}
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
