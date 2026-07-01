<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import TripExpensesSection from '$lib/components/Trips/TripPage/TripExpensesSection/TripExpensesSection.svelte';
  import TripHeader from '$lib/components/Trips/TripPage/TripHeader/TripHeader.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import PrimaryButton from '$lib/components/ui/Buttons/PrimaryButton/PrimaryButton.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useTripPageStore } from '$lib/stores/app/pages/trip-page.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  onMount(() => {
    if (!tripId) {
      return;
    }

    const loadTrip = async () => {
      try {
        await useExpenseListStore.fetch(tripId);

        const tripCurrency = useTripStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await useHistoricalCurrencyExchangeStore.fetchSilent(tripCurrency, homeCurrency);
        }

        useExpenseListStore.updateExchangeData();
      } catch (error) {
        console.error('Failed to fetch trip:', error);
      }
    };

    loadTrip();
  });

  beforeNavigate((navigation) => {
    // Ignore refresh/tab close
    if (!navigation.to) return;

    useExpenseFiltersStore.reset();
    useTripPageStore.reset();
  });
</script>

<svelte:head>
  <title>{useTripStore.trip?.name || '...'}</title>
</svelte:head>

{#snippet content()}
  {#if useExpenseListStore.mounted && !useExpenseListStore.expenses.length}
    <Box>
      <Instructions>
        You don't have any expenses.<br /> use "Add expense" button to add an expense
      </Instructions>
      <ControlSection controlsAlignment="center">
        <PrimaryButton
          href={resolve(`/trips/${tripId}/expenses/add`)}
          class="TripPageAddExpenseButton"
        >
          <span class="Icon">
            <Icon icon="material-symbols:add-rounded" />
          </span>
          Add expense
        </PrimaryButton>
      </ControlSection>
    </Box>
  {:else if useExpenseListStore.mounted && useExpenseListStore.expenses.length}
    <TripExpensesSection />
  {/if}
{/snippet}

{#if useTripStore.fetching}
  <Loading />
{:else if !useTripStore.fetching && useTripStore.mounted}
  <TripHeader />
  {#if useExpenseListStore.fetching}
    <Loading />
  {:else}
    {@render content()}
  {/if}
{/if}

<style lang="scss">
  :global(.TripPageAddExpenseButton .Icon) {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }
</style>
