<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expenses/EditExpense/EditExpense.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import type { EditExpenseFormData } from '$lib/stores/expense/types';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
  const isArchived = $derived(useExpenseStore.expense?.archived || false);

  async function updateExpense(data: EditExpenseFormData) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;
      await useEditExpenseStore.update(expenseId, data);

      toasts.add({
        title: 'Successs',
        description: 'Expense details updated',
        color: 'primary',
      });

      await useExpenseStore.fetch(expenseId);

      await goto(resolve(`/trips/${tripId}/expenses/${expenseId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to edit expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  async function toggleArchivedExpense() {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;
      await useEditExpenseStore.toggleArchived(expenseId);

      toasts.add({
        title: 'Successs',
        description: isArchived ? 'Expense restored' : 'Expense deleted',
        color: 'primary',
      });

      await useExpenseStore.fetch(tripId);

      await goto(resolve(`/trips/${tripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: isArchived ? 'Failed to restore expense' : 'Failed to delete expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  function deleteConfirmation() {
    modals.add('confirm', {
      title: 'Delete Expense',
      description: 'Are you sure you want to delete this expense?',
      onaccept: toggleArchivedExpense,
    });
  }

  function restoreConfirmation() {
    modals.add('confirm', {
      title: 'Restore expense',
      description: 'Are you sure you want to restore this expense?',
      onaccept: toggleArchivedExpense,
    });
  }
</script>

<svelte:head>
  <title>Edit expense</title>
</svelte:head>

{#if useExpenseStore.expense && useTripStore.trip}
  <div>
    <EditExpense
      trip={useTripStore.trip}
      mode="edit"
      data={useExpenseStore.expense}
      onsubmit={updateExpense}
      disabled={fetching}
    />
  </div>

  <ControlSection controlsAlignment="center" class="ExpenseEditControls">
    {#if isArchived}
      <Button onclick={restoreConfirmation}>Restore expense</Button>
    {:else}
      <Button color="danger" onclick={deleteConfirmation}>Delete expense</Button>
    {/if}
  </ControlSection>
{:else}
  ---
{/if}

<style lang="scss">
  :global(.ExpenseEditControls) {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
