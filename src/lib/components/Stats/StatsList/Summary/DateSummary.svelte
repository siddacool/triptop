<script lang="ts">
  import { createDate } from '$lib/helpers/date-time/createDate';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { Column } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const startDate = $derived(
    useTripStatsStore.tripSummary?.startDate
      ? createDate(useTripStatsStore.tripSummary?.startDate).format('MMM D, YYYY')
      : undefined,
  );
  const endDate = $derived(
    useTripStatsStore.tripSummary?.endDate
      ? createDate(useTripStatsStore.tripSummary?.endDate).format('MMM D, YYYY')
      : undefined,
  );
</script>

{#if startDate && endDate}
  <Column>
    <div class="DateSummary">
      <spn class="Icon">
        <Icon icon="hugeicons:date-time" />
      </spn>

      {#if startDate === endDate}
        {startDate}
      {:else}
        {startDate} - {endDate}
      {/if}
    </div>
  </Column>
{/if}

<style lang="scss">
  .DateSummary {
    display: flex;
    align-items: center;
    font-size: 1.1rem;

    .Icon {
      font-size: 1.5rem;
      margin-right: var(--dodo-ui-space);
      display: inline-flex;
      align-items: center;
    }
  }
</style>
