<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';

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

      await useEditExpenseStore.toggleArchived(expenseId, archiveCondition);

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Expense archived' : 'Expense unarchived',
        color: 'primary',
      });

      await goto(resolve(`/trips/${tripId}`));
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
    const archiveState = useExpenseStore.expense?.archived || false;
    const archiveCondition = !archiveState;

    if (archiveCondition) {
      archiveConfirmation();
      return;
    }

    toggleArchive(false);
  }
</script>

<DropdownMenuItem onSelect={onselect} outline>
  <span class="Icon">
    <Icon icon="material-symbols:archive-outline" />
  </span>

  {#if useExpenseStore.expense?.archived}
    Unarchive expense
  {:else}
    Archive expense
  {/if}
</DropdownMenuItem>
