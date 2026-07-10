<script lang="ts">
  import CategoryIcon from '$lib/features/expense/components/Category/CategoryIcon/CategoryIcon.svelte';
  import { categoryOptions } from '$lib/features/expense/config/category-options';
  import { Category } from '$lib/features/expense/types/category';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { getLocalStoreData, setLocalStoreData } from '$lib/utils/storage';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import StatsCardPro from '../../StatsCardPro/StatsCardPro.svelte';
  import type { LevelStage } from '../../Controls/DetailsExpander/DetailsExpander.svelte';

  const CATEGORY_LEVEL = 'STATS_CATEGORY_LEVEL';

  let level: LevelStage = $state(
    getLocalStoreData<LevelStage | undefined>('session', CATEGORY_LEVEL) || 'normal',
  );

  $effect(() => {
    setLocalStoreData<LevelStage>('session', CATEGORY_LEVEL, level);
  });
</script>

<div class="Category">
  {#if tripDetailStore.trip}
    <StatsCardPro
      class="Category"
      title="Category"
      bind:level
      showLevel
      trip={tripDetailStore.trip}
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
