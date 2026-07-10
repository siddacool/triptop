<script lang="ts">
  import { page } from '$app/state';
  import ExpenseCardDetailed from '$lib/components/Expenses/ExpenseCardDetailed/ExpenseCardDetailed.svelte';
  import ExpenseDetailsHeader from '$lib/components/Expenses/ExpenseDetailsPage/ExpenseDetailsHeader/ExpenseDetailsHeader.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte.ts';
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

    const loadContents = async () => {
      try {
        useHistoricalCurrencyExchangeStore.clear();
        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await useHistoricalCurrencyExchangeStore.fetchSilent(tripId, tripCurrency, homeCurrency);
        }

        await expenseDeatilStore.load(expenseId);
      } catch (error) {
        console.error('Failed to fetch expsense:', error);
      }
    };

    loadContents();
  });
</script>

<svelte:head>
  <title>{expenseDeatilStore.expense?.name || ''}</title>
</svelte:head>

{#if expenseDeatilStore.loading || tripDetailStore.loading || useHistoricalCurrencyExchangeStore.fetching}
  <Loading />
{:else if expenseDeatilStore.expense && tripDetailStore.trip}
  <ExpenseDetailsHeader />
  <Box>
    <ExpenseCardDetailed
      expense={expenseDeatilStore.expense}
      trip={tripDetailStore.trip}
      class="ExpensesDetailsCard"
    />
  </Box>
{/if}

<style lang="scss">
  :global(.ExpensesDetailsCard) {
    margin-top: calc(var(--dodo-ui-space) * 1);
  }
</style>
