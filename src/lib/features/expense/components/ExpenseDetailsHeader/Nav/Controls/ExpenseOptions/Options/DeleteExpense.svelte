<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Text } from '@flightlesslabs/dodo-ui';
  import { deleteExpense as deleteExpenseCRUD } from '$lib/features/expense/logic/crud.svelte';

  const tripId = page.params.tripId || '';
  const expenseId = page.params.expenseId || '';

  async function deleteExpense() {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      await deleteExpenseCRUD(expenseId);

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
    }
  }

  function deleteConfirmation() {
    modals.add('confirm', {
      title: 'Delete expense',
      description: 'Are you sure you want to delete this expense?',
      onaccept: deleteExpense,
    });
  }
</script>

<DropdownMenuItem onSelect={deleteConfirmation} outline>
  <Text color="danger" class="ExpenseDetailsPageOptionDeleteText">
    <span class="Icon">
      <Icon icon="material-symbols:delete-outline-rounded" />
    </span>
    Delete expense
  </Text>
</DropdownMenuItem>

<style lang="scss">
  :global(.ExpenseDetailsPageOptionDeleteText) {
    display: flex;
    align-items: center;
  }
</style>
