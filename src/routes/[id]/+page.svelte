<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import ExpenseList from '$lib/components/Trip/ExpenseList/ExpenseList.svelte';
  import TripDetailsHeader from '$lib/components/Trip/TripDetailsHeader.svelte';
  import TripDetailsInfo from '$lib/components/Trip/TripDetailsInfo';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const fetching = $derived(
    useTripsStore.fetching || useBudgetStore.fetching || useExpenseStore.fetching ? true : false,
  );

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));

  $effect(() => {
    if (targetTrip) {
      useLocalSettingsStore.updateLastOpenTrip(targetTrip._id);
    }
  });

  beforeNavigate((val) => {
    if (val.to?.route?.id === '/') {
      useLocalSettingsStore.resetLastOpenTrip();
    }
  });
</script>

<title>{targetTrip?.name}</title>

<Stack space={4}>
  {#if mounted && targetTrip}
    <TripDetailsHeader />
    <TripDetailsInfo />
    <StackItem>
      <div class="create">
        <AnchorButton href={`/${id}/expense/create`} variant="primary" compact>
          <Icon icon="mdi:plus" />
        </AnchorButton>
      </div>
    </StackItem>
    <ExpenseList />
  {:else if fetching}
    <StackItem>Loading...</StackItem>
  {:else}
    <StackItem>
      <h3>No trip found</h3>
    </StackItem>
  {/if}
</Stack>

<style lang="scss">
  .create {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
