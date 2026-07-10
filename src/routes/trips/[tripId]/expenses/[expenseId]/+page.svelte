<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onMount } from 'svelte';
  import ExpenseDetailsHeader from '$lib/features/expense/components/ExpenseDetailsHeader/ExpenseDetailsHeader.svelte';
  import ExpenseCardDetailed from '$lib/features/expense/components/ExpenseCardDetailed/ExpenseCardDetailed.svelte';
  import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      return;
    }

    if (!expenseId) {
      return;
    }

    const loadContents = async () => {
      try {
        historicalRatesExchangeStore.clear();
        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = settingsStore.settings.homeCurrency;
        const enableCurrencyConversion = settingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await historicalRatesExchangeStore.load(tripId, tripCurrency, homeCurrency);
        }

        await expenseDeatilStore.load(expenseId);
      } finally {
        loading = false;
      }
    };

    loadContents();
  });
</script>

<svelte:head>
  <title>{expenseDeatilStore.expense?.name || ''}</title>
</svelte:head>

{#if loading}
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
