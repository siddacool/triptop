<script lang="ts">
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import BaseModal from '$lib/ui-lib/ModalMaster/BaseModal';
  import { Grid } from '@flightlesslabs/grid';
  import CategoryPicker from './CategoryPicker.svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import PaymentModePicker from './PaymentModePicker.svelte';
  import CurrencyPicker from './CurrencyPicker.svelte';
  import DateRange from './DateRange.svelte';
  import TagsPicker from './TagsPicker.svelte';

  interface SelectiveFiltersModalProps {
    open?: boolean;
    onClose: () => void;
  }

  let { open = $bindable(false), onClose }: SelectiveFiltersModalProps = $props();

  function onClear() {
    useExpenseFiltersStore.updateFilters({ selectiveFilters: {} });
    onClose();
  }
</script>

<BaseModal bind:open>
  {#snippet title()}
    Selective Filters
  {/snippet}

  <div class="content">
    <Grid spacing={2}>
      <CategoryPicker />
      <PaymentModePicker />
      <CurrencyPicker />
      <TagsPicker />
      <DateRange />
    </Grid>
  </div>

  {#snippet controls()}
    <div class="ModalControls">
      <Button name="ok" color="secondary" onclick={onClose}>OK</Button>

      {#if useExpenseFiltersStore.isAnySelectiveFilters}
        <Button name="ok" onclick={onClear}>Clear Filters</Button>
      {/if}
    </div>
  {/snippet}
</BaseModal>

<style lang="scss">
  .ModalControls {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>
