<script lang="ts">
  import type { LevelStage } from '$lib/components/ui/Stats/Controls/DetailsExpander/DetailsExpander.svelte';
  import StatsCardPro from '$lib/components/ui/Stats/StatsCardPro/StatsCardPro.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { createDate } from '$lib/utils/date-time/createDate';
  import { getLocalStoreData, setLocalStoreData } from '$lib/utils/storage';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { transformDates } from './utils';

  const DATE_LEVEL = 'STATS_DATE_LEVEL';

  const today = $derived(createDate());
  const dates = $derived(transformDates(today, useTripStatsStore.dateStats));

  let level: LevelStage = $state(
    getLocalStoreData<LevelStage | undefined>('session', DATE_LEVEL) || 'normal',
  );

  $effect(() => {
    setLocalStoreData<LevelStage>('session', DATE_LEVEL, level);
  });
</script>

<div class="Dates">
  {#if tripDetailStore.trip}
    <StatsCardPro
      class="Dates"
      title="Dates"
      bind:level
      showLevel
      trip={tripDetailStore.trip}
      groupStats={dates}
    />
  {/if}
</div>

<style lang="scss">
  .Dates {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
