<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ExpesnseEditForm from '$lib/components/Expense/Edit/ExpesnseEditForm/ExpesnseEditForm.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { ExpenseFormData } from '$lib/stores/expense/types';

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
  const name = $derived(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');

  async function onSave(data: ExpenseFormData) {
    try {
      await useExpenseStore.update(expenseId, data);

      goto(`/${tripId}`);
    } catch (e) {
      console.log(e);
    }
  }

  async function onDelete() {
    try {
      await useExpenseStore.delete(expenseId);

      goto(`/${tripId}`);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Edit expense: {name}</title>

<meta name="description" content="Expense Edit" />

<PageHeader title={`Edit expense: ${name}`} backTo={`/${tripId}/${expenseId}`} />

<Stack space={4}>
  <ExpesnseEditForm {onSave} {expenseId} />
  <StackItem>
    <Button variant="danger" onclick={onDelete}>Delete expense</Button>
  </StackItem>
</Stack>
