<script lang="ts">
  import CategorySelect from '$lib/components/ui/Category/CategorySelect/CategorySelect.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import type { Category } from '$lib/stores/category/types';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Button, Column, FormField, Grid, Indicator } from '@flightlesslabs/dodo-ui';

  type Props = {
    onconfirm?: () => void;
    onclear?: () => void;
  };

  let { onconfirm, onclear }: Props = $props();

  let category: Category | undefined = $derived(useExpenseFiltersStore.filters.category);
  let isAnyActive = $derived(category ? true : false);

  function handleOnConfirm() {
    useExpenseFiltersStore.updateFilter({ category });

    if (onconfirm) {
      onconfirm();
    }
  }

  function handleOnClear() {
    useExpenseFiltersStore.clearSpecialFilters();

    if (onclear) {
      onclear();
    }
  }
</script>

<div class="ExpenseFilter">
  <Grid gap={3}>
    <Column>
      <FormField label="Category:" for="category">
        <CategorySelect name="category" bind:value={category} clearable />
      </FormField>
    </Column>
    <Column>
      <ControlSection>
        <Button color="primary" onclick={handleOnConfirm} class="ApplyFiltersButton">
          Apply filters

          {#if isAnyActive}
            <Indicator color="danger" font-size="0.5rem" class="SpecialFiltersDot" />
          {/if}
        </Button>
        <Button color="primary" variant="text" onclick={handleOnClear}>Clear filters</Button>
      </ControlSection>
    </Column>
  </Grid>
</div>

<style lang="scss">
  .ExpenseFilter {
    :global(.ApplyFiltersButton) {
      position: relative;

      @media (min-width: 600px) {
        min-width: 150px;
      }
    }

    :global(.SpecialFiltersDot) {
      color: var(--dodo-color-constant-white);
      margin-left: var(--dodo-ui-space);

      @media (min-width: 600px) {
        position: absolute;
        right: 10px;
        margin-left: 0;
      }
    }
  }
</style>
