<script lang="ts">
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import StackItem from '../../ui-framework/Layout/Stack/StackItem.svelte';
  import DateInput from '../../ui-framework/Form/DateInput.svelte';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import { page } from '$app/state';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Button from '../../ui-framework/Form/Button.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;

  const expenseGroups = $derived(
    getExpenseDateGroups(tripId)
      .map((item) => item.date)
      .reverse(),
  );

  const tripEndDate = $derived(
    useTripsStore.data.find((item) => item._id === tripId)?.endDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.endDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );

  const endDate = $derived(
    expenseGroups[expenseGroups.length - 1] ? expenseGroups[expenseGroups.length - 1] : tripEndDate,
  );

  function onchange(e: Event) {
    const element = e.target as HTMLInputElement;

    useStatisticsStore.updateEndDate(
      getMoment(element.value, DateFormats.YEAR_FIRST_STANDARD).valueOf(),
    );
  }

  function onClearEndDate() {
    useStatisticsStore.updateEndDate(undefined);
  }

  $effect(() => {
    useStatisticsStore.updateEndDate(getMoment(endDate, DateFormats.YEAR_FIRST_STANDARD).valueOf());
  });
</script>

<StackItem>
  <div class="endDateContainer">
    <DateInput
      label="End date"
      name="endDate"
      value={useStatisticsStore.endDate
        ? getMoment(useStatisticsStore.endDate).format(DateFormats.YEAR_FIRST_STANDARD)
        : undefined}
      {onchange}
      min={useStatisticsStore.startDate
        ? getMoment(useStatisticsStore.startDate).format(DateFormats.YEAR_FIRST_STANDARD)
        : undefined}
      max={endDate}
    />

    <Button
      compact
      name="end-date-clear"
      onclick={onClearEndDate}
      disabled={!useStatisticsStore.endDate}
    >
      <Icon icon="material-symbols:close-rounded" />
    </Button>
  </div>
</StackItem>

<style lang="scss">
  .endDateContainer {
    display: flex;
    width: 100%;
    align-items: flex-end;

    :global(.DateInput) {
      flex: 1;
      margin-right: 16px;
    }
  }
</style>
