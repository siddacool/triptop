<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import { archiveExpense, unarchiveExpense } from '../../logic/crud.svelte';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
  const isArchived = $derived(expenseDeatilStore.expense?.archived || false);

  async function toggleArchive(archiveCondition: boolean) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;

      if (archiveCondition) {
        await archiveExpense(expenseId);
      } else {
        await unarchiveExpense(expenseId);
      }

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Expense deleted' : 'Expense restored',
        color: 'primary',
      });

      await goto(resolve(`/trips/${tripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: archiveCondition ? 'Failed to delete expense' : 'Failed to restore expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive expense',
      description: 'Are you sure you want to archive this expense?',
      onaccept: () => toggleArchive(true),
    });
  }
</script>

{#if isArchived}
  <Button onclick={() => toggleArchive(false)} disabled={fetching}>Unarchive expense</Button>
{:else}
  <Button color="neutral" onclick={archiveConfirmation} disabled={fetching}>Archive expense</Button>
{/if}
