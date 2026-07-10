<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import type { ExpenseCreateData } from '$lib/features/expense/types';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import EditExpense from '$lib/features/expense/components/EditExpense/EditExpense.svelte';
  import { saveExpense } from '$lib/features/expense/logic/crud.svelte';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;

  async function createTrip(data: ExpenseCreateData, eventSubmitter?: HTMLElement | null) {
    try {
      if (!tripId) {
        return;
      }

      fetching = true;

      await saveExpense(data);

      const eventSubmitterRaw = eventSubmitter as HTMLInputElement | null;

      if (eventSubmitterRaw?.name === 'save-and-add-new') {
        return;
      }

      goto(resolve(`/trips/${tripId}/`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to add expense',
        description: message,
        color: 'danger',
      });
    } finally {
      fetching = false;
    }
  }
</script>

<svelte:head>
  <title>Add expense</title>
</svelte:head>

{#if tripDetailStore.trip}
  <WhiteMaterial>
    <Box>
      <div>
        <PageHeadingNav class="TripHeader" href={`/trips/${tripId}`}>Add expense</PageHeadingNav>
        <EditExpense
          trip={tripDetailStore.trip}
          mode="create"
          onsubmit={createTrip}
          disabled={fetching}
        />
      </div>
    </Box>
  </WhiteMaterial>
{/if}
