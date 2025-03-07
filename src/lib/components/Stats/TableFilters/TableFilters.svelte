<script lang="ts">
  import StackItem from '../../ui-framework/Layout/Stack/StackItem.svelte';
  import Stack from '../../ui-framework/Layout/Stack/Stack.svelte';
  import StartDate from './StartDate.svelte';
  import EndDate from './EndDate.svelte';
  import ResetDates from './ResetDates.svelte';
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import { page } from '$app/state';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import Filter from '$lib/components/Filter.svelte';

  const tripId = page.params.tripId;

  const expenseGroups = $derived(
    getExpenseDateGroups(tripId)
      .map((item) => item.date)
      .reverse(),
  );

  const tripStartDate = $derived(
    useTripsStore.data.find((item) => item._id === tripId)?.startDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.startDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );

  const tripEndDate = $derived(
    useTripsStore.data.find((item) => item._id === tripId)?.endDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.endDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );

  const startDate = $derived(expenseGroups[0] ? expenseGroups[0] : tripStartDate);
  const endDate = $derived(
    expenseGroups[expenseGroups.length - 1] ? expenseGroups[expenseGroups.length - 1] : tripEndDate,
  );

  const statsStartDate = $derived(
    useStatisticsStore.startDate
      ? getMoment(useStatisticsStore.startDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : '',
  );

  const statsEndDate = $derived(
    useStatisticsStore.endDate
      ? getMoment(useStatisticsStore.endDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : '',
  );

  const isFullRange = $derived(statsStartDate === startDate && statsEndDate === endDate);
</script>

<StackItem>
  <Filter
    open={useStatisticsStore.tableFiltersPanel}
    onclick={useStatisticsStore.toggleTableFiltersPanel}
    isFilter={!isFullRange}
  >
    <Stack space={2}>
      <StartDate />
      <EndDate />
      <ResetDates />
    </Stack>
  </Filter>
</StackItem>
