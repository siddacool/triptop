<script lang="ts">
  import SecondaryCurrency from '$lib/components/ui/SecondaryCurrency/SecondaryCurrency.svelte';
  import {
    getExpensesTotal,
    getExpensesTotalAmountHomeCurrency,
  } from '$lib/stores/expense/getters/total-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  const total = $derived(getExpensesTotal(useExpenseListStore.filtredExpenses));
  const amountHomeCurrencyTotal = $derived(
    getExpensesTotalAmountHomeCurrency(useExpenseListStore.filtredExpenses),
  );
  const locale = $derived(useTripStore?.trip?.locale);
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

    {#if useSettingsStore.settings.enableCurrencyConversion}
      <SecondaryCurrency
        value={amountHomeCurrencyTotal}
        currency={useSettingsStore.settings.homeCurrency}
        locale={useSettingsStore.settings.locale}
      />
    {/if}
  </div>
{/if}

<style lang="scss">
  .TotalExpenses {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    line-height: 1;

    :global(.dodo-ui-Text) {
      color: var(--dodo-color-neutral-800);
    }

    :global(.SecondaryCurrency) {
      margin-top: var(--dodo-ui-space);
      font-size: 0.9rem;
    }
  }
</style>
