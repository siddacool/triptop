<script lang="ts">
  import CategoryIcon from '$lib/components/ui/Category/CategoryIcon/CategoryIcon.svelte';
  import type { LevelStage } from '$lib/components/ui/Stats/Controls/DetailsExpander/DetailsExpander.svelte';
  import StatsCardPro from '$lib/components/ui/Stats/StatsCardPro/StatsCardPro.svelte';
  import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
  import { categoryOptions } from '$lib/stores/category/data';
  import { Category } from '$lib/stores/category/types';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';

  const CATEGORY_LEVEL = 'STATS_CATEGORY_LEVEL';

  let level: LevelStage = $state(
    getLocalStoreData<LevelStage | undefined>('session', CATEGORY_LEVEL) || 'normal',
  );

  $effect(() => {
    setLocalStoreData<LevelStage>('session', CATEGORY_LEVEL, level);
  });
</script>

<div class="Category">
  {#if useTripStore.trip}
    <StatsCardPro
      class="Category"
      title="Category"
      bind:level
      showLevel
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
      display: flex;
      align-items: center;

      &.level--expert {
        :global(.CategoryIcon) {
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
