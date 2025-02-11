<script lang="ts">
  import { page } from '$app/state';
  import ExpenseList from '$lib/components/Trip/ExpenseList.svelte';
  import TripStats from '$lib/components/Trip/TripStats.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
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
</script>

{#if mounted && targetTrip}
  <h2>
    <div>
      <AnchorButton href={`/`} compact>
        <Icon icon="lets-icons:back" />
      </AnchorButton>
      {targetTrip?.name}
    </div>
    <AnchorButton href={`/trips/${id}/edit`} variant="primary" compact>
      <Icon icon="material-symbols:edit" />
    </AnchorButton>
  </h2>
  <Stack space={3}>
    <StackItem>
      <TripStats />
    </StackItem>
    <StackItem>
      <ExpenseList />
    </StackItem>

    <StackItem>
      <div class="create">
        <AnchorButton href={`/trips/${id}/expense/create`} variant="primary" compact>
          <Icon icon="mdi:plus" />
        </AnchorButton>
      </div>
    </StackItem>
  </Stack>
{/if}

{#if fetching}
  <p>Loading...</p>
{/if}

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .create {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
