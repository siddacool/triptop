<script lang="ts">
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import { getExpenseDatesOnly, useExpensesStore } from '$lib/stores/expense/list.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import DatePicker from '$lib/ui-lib/DatePicker/DatePicker.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { getMoment } from '@flightlesslabs/utils';
  import Icon from '@iconify/svelte';
  import { parseDate, type DateValue } from '@internationalized/date';
  import { onMount } from 'svelte';
  const startDateIsoStringData = $derived(
    useExpenseFiltersStore.selectiveFilters?.date?.startDate
      ? getMoment(useExpenseFiltersStore.selectiveFilters?.date?.startDate).format('YYYY-MM-DD')
      : undefined,
  );
  const startDateParsedDate = $derived(
    startDateIsoStringData ? parseDate(startDateIsoStringData) : undefined,
  );
  const expenseDates = $derived(getExpenseDatesOnly(useExpensesStore.data || []));
  const minDate = $derived(
    expenseDates[expenseDates.length - 1]
      ? parseDate(expenseDates[expenseDates.length - 1])
      : undefined,
  );
  const maxDate = $derived(expenseDates[0] ? parseDate(expenseDates[0]) : undefined);

  const endDateIsoStringData = $derived(
    useExpenseFiltersStore.selectiveFilters?.date?.endDate
      ? getMoment(useExpenseFiltersStore.selectiveFilters?.date?.endDate).format('YYYY-MM-DD')
      : undefined,
  );
  const endDateParsedDate = $derived(
    endDateIsoStringData ? parseDate(endDateIsoStringData) : undefined,
  );

  function onchange(name: string, val: DateValue | undefined) {
    const dateFilter = useExpenseFiltersStore.selectiveFilters.date;
    const formattedDate = val ? val.toString() : undefined;

    if (name === 'startDate') {
      useExpenseFiltersStore.updateSelectiveFilters({
        date: { startDate: formattedDate, endDate: undefined },
      });
    } else {
      useExpenseFiltersStore.updateSelectiveFilters({
        date: { ...dateFilter, endDate: formattedDate },
      });
    }
  }

  onMount(() => {
    return () => {
      if (
        useExpenseFiltersStore.selectiveFilters?.date?.startDate &&
        useExpenseFiltersStore.selectiveFilters?.date?.endDate
      ) {
        return;
      }

      useExpenseFiltersStore.updateSelectiveFilters({
        date: { startDate: undefined, endDate: undefined },
      });
    };
  });

  $effect(() => {
    console.log(expenseDates);
  });
</script>

<Column>
  <Grid>
    <Column>
      <FormControl label="Start date:" for="startDate">
        <DatePicker
          name="startDate"
          placeholder="Select Date"
          value={startDateParsedDate}
          maxValue={maxDate}
          minValue={minDate}
          onchange={(val) => onchange('startDate', val)}
          initialDate={minDate}
        />
      </FormControl>
    </Column>
    <Column>
      <FormControl label="End date:" for="endDate">
        <div class="DatePickerHolder">
          <DatePicker
            name="endDate"
            placeholder="Select Date"
            value={endDateParsedDate}
            onchange={(val) => onchange('endDate', val)}
            maxValue={maxDate}
            minValue={startDateParsedDate}
            disabled={!startDateParsedDate}
            initialDate={startDateParsedDate}
          />

          <Button
            class="ClearAll"
            onclick={() => useExpenseFiltersStore.updateSelectiveFilters({ date: undefined })}
            aria-label="Clear Filter"
            compact
            disabled={!startDateParsedDate || !endDateParsedDate}
          >
            <Icon icon="material-symbols:close-small" width="28" height="28" class="checkIcon" />
          </Button>
        </div>
      </FormControl>
    </Column>
  </Grid>
</Column>

<style lang="scss">
  .DatePickerHolder {
    display: flex;
    align-items: flex-end;
    height: 100%;

    :global(.DatePicker) {
      flex: 1;
    }

    :global(.ClearAll) {
      margin-left: 8px;
    }
  }
</style>
