<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expenses/EditExpense/EditExpense.svelte';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import type { EditExpenseFormData } from '$lib/stores/expense/types';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

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

  async function deleteExpense() {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;
      await useEditExpenseStore.delete(expenseId);

      toasts.add({
        title: 'Successs',
        description: 'Expense deleted',
        color: 'primary',
      });

      await useExpenseStore.fetch(tripId);

      await goto(resolve(`/trips/${tripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to delete expense',
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
      onaccept: deleteExpense,
    });
  }
</script>

<svelte:head>
  <title>Edit expense</title>
</svelte:head>

{#if useExpenseStore.expense && useTripStore.trip}
  <div>
    <EditExpense
      currency={useTripStore.trip.currency}
      mode="edit"
      data={useExpenseStore.expense}
      onsubmit={updateExpense}
      disabled={fetching}
    />
  </div>

  <div class="controls">
    <Button color="danger" onclick={deleteConfirmation}>Delete expense</Button>
  </div>
{:else}
  ---
{/if}

<style lang="scss">
  .controls {
    margin-top: calc(var(--dodo-ui-space) * 3);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
    }

    :global(.dodo-ui-Button) {
      width: 100%;
      margin-bottom: calc(var(--dodo-ui-space) * 2);

      @media (min-width: 600px) {
        width: initial;
        margin: 0 var(--dodo-ui-space);
        margin-bottom: 0;
      }
    }
  }
</style>
