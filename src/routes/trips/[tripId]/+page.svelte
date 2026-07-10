<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import NoExpenses from '$lib/features/expense/components/NoExpenses.svelte';
  import { clearExpenseFilters } from '$lib/features/expense/logic/filters.svelte';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import TripExpensesSection from '$lib/features/trip/components/TripExpensesSection/TripExpensesSection.svelte';
  import TripHeader from '$lib/features/trip/components/TripHeader/TripHeader.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      return;
    }

    const loadTrip = async () => {
      try {
        historicalRatesExchangeStore.clear();
        await tripDetailStore.load(tripId);

        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = settingsStore.settings.homeCurrency;
        const enableCurrencyConversion = settingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await historicalRatesExchangeStore.load(tripId, tripCurrency, homeCurrency);
        }

        await expenseListStore.load(tripId);
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });

  beforeNavigate((navigation) => {
    // Ignore refresh/tab close
    if (!navigation.to) return;

    clearExpenseFilters();
  });
</script>

<svelte:head>
  <title>{tripDetailStore.trip?.name || '...'}</title>
</svelte:head>

{#snippet content()}
  {#if expenseListStore.expenses.length}
    <TripExpensesSection />
  {:else}
    <NoExpenses />
  {/if}
{/snippet}

<TripHeader />

{#if loading}
  <Loading />
{:else}
  {@render content()}
{/if}

<style lang="scss">
  :global(.TripPageAddExpenseButton .Icon) {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }
</style>
