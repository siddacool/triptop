<script lang="ts">
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { createDate } from '$lib/utils/date-time/createDate';
  import { getLocalStoreData, setLocalStoreData } from '$lib/utils/storage';
  import { statsStore } from '$lib/features/stats/store/main.svelte';
  import { transformDates } from './utils';
  import type { LevelStage } from '../../Controls/DetailsExpander/DetailsExpander.svelte';
  import StatsCardPro from '../../StatsCardPro/StatsCardPro.svelte';

  const DATE_LEVEL = 'STATS_DATE_LEVEL';

  const today = $derived(createDate());
  const dates = $derived(transformDates(today, statsStore.dateStats));

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
