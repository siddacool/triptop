<script lang="ts">
  import { createDate } from '$lib/utils/date-time/createDate';
  import { statsStore } from '$lib/features/stats/store/main.svelte';
  import { Column } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const startDate = $derived(
    statsStore.tripSummary?.startDate
      ? createDate(statsStore.tripSummary?.startDate).format('MMM D, YYYY')
      : undefined,
  );
  const endDate = $derived(
    statsStore.tripSummary?.endDate
      ? createDate(statsStore.tripSummary?.endDate).format('MMM D, YYYY')
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
    font-size: 1rem;

    .Icon {
      font-size: 1.3rem;
      margin-right: var(--dodo-ui-space);
      display: inline-flex;
      align-items: center;
    }
  }
</style>
