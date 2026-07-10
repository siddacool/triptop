<script lang="ts">
  import { Column, Money, Threshold } from '@flightlesslabs/dodo-ui';
  import HomeCurrencyExchange from '$lib/features/exchange/components/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import Icon from '@iconify/svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
</script>

{#if tripDetailStore.trip && useTripStatsStore?.tripSummary}
  <Column>
    <div class="Total">
      <spn class="Icon">
        <Icon icon="iconoir:cash" />
      </spn>

      <Threshold
        value={useTripStatsStore.tripSummary.total.amount}
        threshold={0}
        colorMap={{ above: 'default' }}
        class="ExpenseAmount"
      >
        <Money
          value={useTripStatsStore.tripSummary.total.amount}
          currency={tripDetailStore.trip.currency}
          locale={tripDetailStore.trip?.locale}
          options={{ maximumFractionDigits: 2 }}
        />
      </Threshold>

      {#if tripDetailStore.trip.enableCurrencyConversion !== false}
        <HomeCurrencyExchange amount={useTripStatsStore.tripSummary.total.amountHomeCurrency} />
      {/if}
    </div>
  </Column>
{/if}

<style lang="scss">
  .Total {
    display: flex;
    align-items: center;
    font-size: 1rem;

    :global(.HomeCurrencyExchange) {
      font-size: 1rem;
      margin-left: var(--dodo-ui-space);
    }

    .Icon {
      font-size: 1.5rem;
      margin-right: var(--dodo-ui-space);
      display: inline-flex;
      align-items: center;
    }
  }
</style>
