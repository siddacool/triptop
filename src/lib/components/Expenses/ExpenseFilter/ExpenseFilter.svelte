<script lang="ts">
  import CategorySelect from '$lib/components/ui/Category/CategorySelect/CategorySelect.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import type { Category } from '$lib/stores/category/types';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import {
    Button,
    Card,
    Column,
    FormField,
    Grid,
    Indicator,
    Row,
    UtilityButton,
  } from '@flightlesslabs/dodo-ui';
  import { DatePicker } from '@flightlesslabs/dodo-ui-date';
  import { createDate } from '@flightlesslabs/time-utils';
  import Icon from '@iconify/svelte';
  import { parseDate, type DateValue } from '@internationalized/date';

  type Props = {
    onconfirm?: () => void;
    onclear?: () => void;
    onclose?: () => void;
  };

  let { onconfirm, onclear, onclose }: Props = $props();

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
  <Card shadow={0} class="ExpenseFilterCard" outline>
    <Grid gap={2}>
      <Column>
        <p class="title">
          Expense filters
          <UtilityButton
            class="CloseButton"
            onclick={onclose}
            roundness="full"
            compact
            color="neutral"
          >
            <Icon icon="ri:close-large-fill" />
          </UtilityButton>
        </p>
      </Column>
      <Column>
        <FormField label="Category:" for="category">
          <CategorySelect
            name="category"
            bind:value={category}
            clearable
            placeholder="Select category"
            size="small"
          />
        </FormField>
      </Column>
      <Row>
        <Column lg={6}>
          <FormField label="Min Date:">
            <DatePicker bind:value={minDate} clearable maxValue={maxDate} size="small" />
          </FormField>
        </Column>
        <Column lg={6}>
          <FormField label="Max Date:">
            <DatePicker bind:value={maxDate} clearable minValue={minDate} size="small" />
          </FormField>
        </Column>
      </Row>
      <Column>
        <ControlSection>
          <Button color="primary" onclick={handleOnConfirm} class="ApplyFiltersButton" size="small">
            Apply filters

            {#if isAnyActive}
              <Indicator color="danger" font-size="0.5rem" class="SpecialFiltersDot" />
            {/if}
          </Button>
          <Button color="primary" variant="text" onclick={handleOnClear} size="small"
            >Clear filters</Button
          >
        </ControlSection>
      </Column>
    </Grid>
  </Card>
</div>

<style lang="scss">
  .ExpenseFilter {
    margin-bottom: calc(var(--dodo-ui-space) * 2);

    .title {
      margin: 0;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :global(.ExpenseFilterCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    :global(.ApplyFiltersButton) {
      position: relative;

      @media (min-width: 400px) {
        min-width: 130px;
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
