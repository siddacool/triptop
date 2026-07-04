<script lang="ts">
  import CategoryIcon from '$lib/components/ui/Category/CategoryIcon/CategoryIcon.svelte';
  import type { LevelStage } from '$lib/components/ui/Stats/Controls/Levels/Levels.svelte';
  import type { SortStage } from '$lib/components/ui/Stats/Controls/Sort/Sort.svelte';
  import StatsCardPro from '$lib/components/ui/Stats/StatsCardPro/StatsCardPro.svelte';
  import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
  import { categoryOptions } from '$lib/stores/category/data';
  import { Category } from '$lib/stores/category/types';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';

  const CATEGORY_LEVEL = 'STATS_CATEGORY_LEVEL';
  const CATEGORY_SORT = 'STATS_CATEGORY_SORT';

  let level: LevelStage = $state(
    getLocalStoreData<LevelStage | undefined>('session', CATEGORY_LEVEL) || 'normal',
  );

  let sort: SortStage = $state(
    getLocalStoreData<SortStage | undefined>('session', CATEGORY_SORT) || 'default',
  );

  $effect(() => {
    setLocalStoreData<LevelStage>('session', CATEGORY_LEVEL, level);
    setLocalStoreData<SortStage>('session', CATEGORY_SORT, sort);
  });
</script>

<div class="Category">
  {#if useTripStore.trip}
    <StatsCardPro
      class="Category"
      title="Category"
      bind:level
      bind:sort
      showLevel
      showSort
      trip={useTripStore.trip}
      groupStats={useTripStatsStore.categoryStats}
    >
      {#snippet customTopicTitle({ topicTitle })}
        <div class={`customTopicTitle level--${level}`}>
          <CategoryIcon value={topicTitle as Category} />
          {categoryOptions.find((item) => item.value === topicTitle)?.label}
        </div>
      {/snippet}
    </StatsCardPro>
  {/if}
</div>

<style lang="scss">
  .Category {
    margin-top: calc(var(--dodo-ui-space) * 3);

    :global(.CategoryIcon) {
      margin-right: var(--dodo-ui-space);
    }

    .customTopicTitle {
      min-width: 150px;
      display: flex;
      align-items: center;

      &.level--amateur,
      &.level--expert {
        min-width: initial;

        :global(.CategoryIcon) {
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
