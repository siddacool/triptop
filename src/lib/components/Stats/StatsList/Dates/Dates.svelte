<script lang="ts">
  import type { LevelStage } from '$lib/components/ui/Stats/Controls/Levels/Levels.svelte';
  import type { SortStage } from '$lib/components/ui/Stats/Controls/Sort/Sort.svelte';
  import StatsCardPro from '$lib/components/ui/Stats/StatsCardPro/StatsCardPro.svelte';
  import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import DateFormatted from './DateFormatted.svelte';

  const DATE_LEVEL = 'STATS_DATE_LEVEL';
  const DATE_SORT = 'STATS_DATE_SORT';

  let level: LevelStage = $state(
    getLocalStoreData<LevelStage | undefined>('session', DATE_LEVEL) || 'normal',
  );

  let sort: SortStage = $state(
    getLocalStoreData<SortStage | undefined>('session', DATE_SORT) || 'default',
  );

  $effect(() => {
    setLocalStoreData<LevelStage>('session', DATE_LEVEL, level);
    setLocalStoreData<SortStage>('session', DATE_SORT, sort);
  });
</script>

<div class="Dates">
  {#if useTripStore.trip}
    <StatsCardPro
      class="Dates"
      title="Dates"
      bind:level
      bind:sort
      showLevel
      showSort
      trip={useTripStore.trip}
      groupStats={useTripStatsStore.dateStats}
    >
      {#snippet customTopicTitle({ topicTitle })}
        <DateFormatted date={topicTitle} />
      {/snippet}
    </StatsCardPro>
  {/if}
</div>

<style lang="scss">
  .Dates {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
