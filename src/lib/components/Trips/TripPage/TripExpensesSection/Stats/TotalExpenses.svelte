<script lang="ts">
  import { getExpensesTotal } from '$lib/stores/expense/getters/total-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  const total = $derived(getExpensesTotal(useExpenseListStore.filtredExpenses));
  const locale = $derived(useTripStore?.trip?.locale || useSettingsStore.settings.locale);
</script>

{#if useTripStore.trip}
  <div class="TotalExpenses">
    <Threshold value={total} threshold={0} colorMap={{ above: 'default' }}>
      <Money
        value={total}
        currency={useTripStore.trip.currency}
        {locale}
        options={{ maximumFractionDigits: 2 }}
      />
    </Threshold>
  </div>
{/if}

<style lang="scss">
  .TotalExpenses {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 1;

    :global(.dodo-ui-Text) {
      color: var(--dodo-color-neutral-800);
    }
  }
</style>
