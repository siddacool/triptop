<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import { deleteExpense } from '../../logic/crud.svelte';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

  async function handleDeleteExpense() {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;

      await deleteExpense(expenseId);

      toasts.add({
        title: 'Successs',
        description: 'Expense deleted',
        color: 'primary',
      });

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
      onaccept: handleDeleteExpense,
    });
  }
</script>

<Button color="danger" onclick={deleteConfirmation} disabled={fetching}>Delete expense</Button>
