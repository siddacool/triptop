<script lang="ts">
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trip/Edit/EditTrip/EditTrip.svelte';
  import EditTripHeader from '$lib/components/Trip/Edit/EditTripHeader/EditTripHeader.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<title>Edit: {targetTrip?.name}</title>

{#if mounted && targetTrip}
  <Stack space={2}>
    <EditTripHeader />
  </Stack>

  <EditTrip tripId={id} />
{/if}
