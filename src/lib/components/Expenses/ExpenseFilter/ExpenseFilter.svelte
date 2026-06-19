<script lang="ts">
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import { categoryOptions } from '$lib/stores/category/data';
  import type { Category } from '$lib/stores/category/types';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { Button, Column, FormField, Grid, Indicator, Row } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { DatePicker } from '@flightlesslabs/dodo-ui-date';
  import { createDate } from '@flightlesslabs/time-utils';
  import { parseDate, type DateValue } from '@internationalized/date';

  type Props = {
    onconfirm?: () => void;
    onclear?: () => void;
  };

  let { onconfirm, onclear }: Props = $props();

  let category: Category | undefined = $derived(useExpenseFiltersStore.filters.category);
  let minDate = $derived<DateValue | undefined>(
    useExpenseFiltersStore.filters.minDate
      ? parseDate(createDate(useExpenseFiltersStore.filters.minDate).format('YYYY-MM-DD'))
      : undefined,
  );
  let maxDate = $derived<DateValue | undefined>(
    useExpenseFiltersStore.filters.maxDate
      ? parseDate(createDate(useExpenseFiltersStore.filters.maxDate).format('YYYY-MM-DD'))
      : undefined,
  );

  let isAnyActive = $derived(category || minDate || maxDate ? true : false);

  function handleOnConfirm() {
    useExpenseFiltersStore.updateFilter({
      category,
      minDate: minDate ? minDate.toString() : undefined,
      maxDate: maxDate ? maxDate.toString() : undefined,
    });

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
        <Select
          options={categoryOptions}
          name="category"
          bind:value={category}
          clearable
          placeholder="Select category"
        />
      </FormField>
    </Column>
    <Row>
      <Column lg={6}>
        <FormField label="Min Date:">
          <DatePicker bind:value={minDate} clearable maxValue={maxDate} />
        </FormField>
      </Column>
      <Column lg={6}>
        <FormField label="Max Date:">
          <DatePicker bind:value={maxDate} clearable minValue={minDate} />
        </FormField>
      </Column>
    </Row>
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
