<script lang="ts">
  import { page } from '$app/state';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import RedirectHomePage from '$lib/components/ui/RedirectHomePage/RedirectHomePage.svelte';
  import { useLatestCurrencyExchangeStore } from '$lib/stores/currency/exchange/latest.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
  let pass = $state(false);
  let loading = $state(true);

  onMount(() => {
    if (!expenseId) {
      return;
    }

    const loadTrip = async () => {
      try {
        useLatestCurrencyExchangeStore.clear();
        await useExpenseStore.fetch(expenseId);

        pass = true;

        const tripCurrency = useTripStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await useLatestCurrencyExchangeStore.fetchSilent(tripCurrency, homeCurrency);
        }

        useExpenseStore.updateExchangeData();
      } catch (error) {
        console.error('Failed to fetch expsense:', error);
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });
</script>

{#if loading}
  <Loading />
{:else if pass}
  {@render children()}
{:else}
  <RedirectHomePage backTo={`/trips/${tripId}`}>Expense does not exists</RedirectHomePage>
{/if}
