<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import type { Expense, ExpenseCreateData } from '$lib/features/expense/types';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import { saveExpense } from '../../logic/crud.svelte';
  import EditExpense from '../EditExpense/EditExpense.svelte';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

  async function updateExpense(data: ExpenseCreateData) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;

      await saveExpense(data);

      toasts.add({
        title: 'Successs',
        description: 'Expense details updated',
        color: 'primary',
      });

      await expenseDeatilStore.load(expenseId);

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
</script>

{#if tripDetailStore.trip}
  <EditExpense
    trip={tripDetailStore.trip}
    mode="edit"
    data={expenseDeatilStore.expense as Expense}
    onsubmit={updateExpense}
    disabled={fetching}
  />
{/if}
