<script lang="ts">
  import { page } from '$app/state';
  import ExpenseCardDetailed from '$lib/components/Expenses/ExpenseCardDetailed/ExpenseCardDetailed.svelte';
  import ExpenseHeader from '$lib/components/Expenses/ExpensePage/ExpenseHeader/ExpenseHeader.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

  onMount(() => {
    if (!tripId) {
      return;
    }

    if (!expenseId) {
      return;
    }

    const loadTrip = async () => {
      try {
        await useExpenseStore.fetch(expenseId);

        const tripCurrency = useTripStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await useExpenseListStore.fetch(tripId);
          await useHistoricalCurrencyExchangeStore.fetchSilent(tripId, tripCurrency, homeCurrency);
        }

        useExpenseStore.updateExchangeData();
      } catch (error) {
        console.error('Failed to fetch expsense:', error);
      }
    };

    loadTrip();
  });
</script>

<svelte:head>
  <title>{useExpenseStore.expense?.name || ''}</title>
</svelte:head>

<WhiteMaterial>
  <Box>
    {#if useExpenseStore.fetching || useTripStore.fetching}
      <Loading />
    {:else if useExpenseStore.expense && useTripStore.trip}
      <ExpenseHeader />
      <ExpenseCardDetailed
        expense={useExpenseStore.expense}
        trip={useTripStore.trip}
        class="ExpensesDetailsCard"
      />
    {/if}
  </Box>
</WhiteMaterial>

<style lang="scss">
  :global(.ExpensesDetailsCard) {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
