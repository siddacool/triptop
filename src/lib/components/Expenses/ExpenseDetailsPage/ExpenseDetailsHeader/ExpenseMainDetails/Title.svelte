<script>
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';
</script>

{#if useExpenseStore.expense && useTripStore.trip}
  <h2>
    <Threshold value={useExpenseStore.expense.amount} threshold={0} colorMap={{ above: 'default' }}>
      <Money
        value={useExpenseStore.expense.amount}
        currency={useTripStore.trip.currency}
        locale={useTripStore.trip.locale}
        options={{ maximumFractionDigits: 2 }}
      />
    </Threshold>
  </h2>
{/if}

<style lang="scss">
  h2 {
    margin: 0;
    margin-right: 4px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--dodo-color-neutral-700);
    font-weight: 500;
  }
</style>
