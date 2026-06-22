<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expenses/EditExpense/EditExpense.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import type { EditExpenseFormData } from '$lib/stores/expense/types';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;

  async function createTrip(data: EditExpenseFormData) {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;
      await useEditExpenseStore.add(tripId, data);

      await goto(resolve(`/trips/${tripId}/`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to add expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }
</script>

<svelte:head>
  <title>Add expense</title>
</svelte:head>

{#if useExpenseStore.fetching || useTripStore.fetching}
  <Loading />
{:else if useTripStore.trip}
  <div>
    <PageHeadingNav class="TripHeader" href={`/trips/${tripId}`}>Add expense</PageHeadingNav>
    <EditExpense trip={useTripStore.trip} mode="create" onsubmit={createTrip} disabled={fetching} />
  </div>
{/if}
