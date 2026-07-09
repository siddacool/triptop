<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import PrimaryButton from '$lib/components/ui/Buttons/PrimaryButton/PrimaryButton.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import TripExpensesSection from '$lib/features/trip/components/TripExpensesSection/TripExpensesSection.svelte';
  import TripHeader from '$lib/features/trip/components/TripHeader/TripHeader.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  onMount(() => {
    if (!tripId) {
      return;
    }

    const loadTrip = async () => {
      try {
        useHistoricalCurrencyExchangeStore.clear();
        await tripDetailStore.load(tripId);

        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await useHistoricalCurrencyExchangeStore.fetchSilent(tripId, tripCurrency, homeCurrency);
        }

        await useExpenseListStore.fetch(tripId);
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
  });
</script>

<svelte:head>
  <title>{tripDetailStore.trip?.name || '...'}</title>
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

<TripHeader />

{#if useExpenseListStore.fetching || useHistoricalCurrencyExchangeStore.fetching}
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
