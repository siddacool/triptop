<script lang="ts">
  import { getExpensesTotal } from '$lib/stores/expense/getters/total-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { DEFAULT_LOCALE } from '$lib/stores/trip/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const total = $derived(getExpensesTotal(useExpenseListStore.filtredExpenses));
</script>

{#if useTripStore.trip}
  <div class="TotalExpenses">
    <span class="MoneyIcon">
      <Icon icon="material-symbols:money-bag-outline" />
    </span>

    <Threshold value={total} threshold={0} colorMap={{ above: 'neutral' }}>
      <Money
        value={total}
        currency={useTripStore.trip.currency}
        locale={useTripStore.trip.locale || DEFAULT_LOCALE}
        options={{ maximumFractionDigits: 2 }}
      />
    </Threshold>
  </div>
{/if}

<style lang="scss">
  .TotalExpenses {
    font-size: 1.05rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 1;

    .MoneyIcon {
      font-size: 1.2rem;
      display: inline-flex;
      margin-right: 4px;
      color: var(--dodo-color-neutral-600);
    }
  }
</style>
