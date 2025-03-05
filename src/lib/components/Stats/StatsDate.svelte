<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import StackItem from '../ui-framework/Layout/Stack/StackItem.svelte';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import { page } from '$app/state';
  import Select from '../ui-framework/Form/Select.svelte';

  const tripId = page.params.tripId;

  const statsSelectedDate: string | undefined = $derived(
    useStatisticsStore.statsSelectedDate ? useStatisticsStore.statsSelectedDate : undefined,
  );

  const expenseGroups = $derived(
    getExpenseDateGroups(tripId)
      .map((item) => item.date)
      .reverse(),
  );

  function onchange(e: Event) {
    const element = e.target as HTMLInputElement;

    useStatisticsStore.updateStatsSelectedDate(element.value ? element.value : undefined);
  }

  $effect(() => {
    return () => {
      useStatisticsStore.updateStatsSelectedDate(undefined);
    };
  });
</script>

<StackItem>
  <div class="StatsDate">
    <Select {onchange}>
      <option value={undefined} selected={statsSelectedDate === undefined}>Entire trip</option>
      {#each expenseGroups as expenseGroup (expenseGroup)}
        <option value={expenseGroup} selected={expenseGroup === statsSelectedDate}>
          {getMoment(expenseGroup, 'YYYY-MM-DD').format('MMM D, YYYY')}
        </option>
      {/each}
    </Select>
  </div>
</StackItem>

<style lang="scss">
  .StatsDate {
    display: flex;
    width: 100%;
    align-items: center;

    :global(.Select) {
      flex: 1;
    }
  }
</style>
