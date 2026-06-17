<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expenses/EditExpense/EditExpense.svelte';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
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
  <title>Create trips</title>
</svelte:head>

{#if useTripStore.trip}
  <div>
    <EditExpense
      currency={useTripStore.trip.currency}
      mode="create"
      onsubmit={createTrip}
      disabled={fetching}
    />
  </div>
{:else}
  ---
{/if}
