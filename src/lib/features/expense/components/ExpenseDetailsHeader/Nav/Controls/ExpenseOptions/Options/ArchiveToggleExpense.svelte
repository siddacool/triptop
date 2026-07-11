<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import { archiveExpense, unarchiveExpense } from '$lib/features/expense/logic/crud.svelte';

  const tripId = page.params.tripId || '';
  const expenseId = page.params.expenseId || '';

  async function toggleArchive(archiveCondition: boolean) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      if (archiveCondition) {
        await archiveExpense(expenseId);
      } else {
        await unarchiveExpense(expenseId);
      }

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Expense archived' : 'Expense unarchived',
        color: 'primary',
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: archiveCondition ? 'Failed to archive expense' : 'Failed to unarchive expense',
        description: message,
        color: 'danger',
      });
    }
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive expense',
      description: 'Are you sure you want to archive this expense?',
      onaccept: () => toggleArchive(true),
    });
  }

  function onselect() {
    const archiveState = expenseDeatilStore.expense?.archived || false;
    const archiveCondition = !archiveState;

    if (archiveCondition) {
      archiveConfirmation();
      return;
    }

    toggleArchive(false);
  }
</script>

<DropdownMenuItem onSelect={onselect} outline>
  {#if expenseDeatilStore.expense?.archived}
    <span class="Icon">
      <Icon icon="material-symbols:unarchive-outline" />
    </span>
    Unarchive expense
  {:else}
    <span class="Icon">
      <Icon icon="material-symbols:archive-outline" />
    </span>
    Archive expense
  {/if}
</DropdownMenuItem>
