<script lang="ts">
  import { Column, Money, Threshold } from '@flightlesslabs/dodo-ui';
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import Icon from '@iconify/svelte';
</script>

{#if useTripStore.trip}
  <Column>
    <div class="Total">
      <spn class="Icon">
        <Icon icon="iconoir:cash" />
      </spn>

      <Threshold
        value={useTripStatsStore.total.amount}
        threshold={0}
        colorMap={{ above: 'default' }}
        class="ExpenseAmount"
      >
        <Money
          value={useTripStatsStore.total.amount}
          currency={useTripStore.trip.currency}
          locale={useTripStore.trip?.locale}
          options={{ maximumFractionDigits: 2 }}
        />
      </Threshold>

      {#if useTripStore.trip.enableCurrencyConversion !== false}
        <HomeCurrencyExchange amount={useTripStatsStore.total.amountHomeCurrency} />
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
