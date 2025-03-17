<script lang="ts">
  import StackItem from '../../ui-framework/Layout/Stack/StackItem.svelte';
  import Stack from '../../ui-framework/Layout/Stack/Stack.svelte';
  import StartDate from './StartDate.svelte';
  import EndDate from './EndDate.svelte';
  import ResetDates from './ResetDates.svelte';
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import Filter from '$lib/components/Filter.svelte';

  const expenseGroups = $derived(
    getExpenseDateGroups()
      .map((item) => item.date)
      .reverse(),
  );

  const tripStartDate = $derived(
    useTripByIdStore.data?.startDate
      ? getMoment(useTripByIdStore.data?.startDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : undefined,
  );

  const tripEndDate = $derived(
    useTripByIdStore.data?.endDate
      ? getMoment(useTripByIdStore.data?.endDate).format(DateFormats.YEAR_FIRST_STANDARD)
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
