<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/EditExpense/EditExpense.svelte';
  import Header from '$lib/components/Header.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateExpenseStore } from '$lib/stores/expense/create.svelte';
  import { onMount } from 'svelte';
  import { editExpenseOnChange } from '../[expenseId]/edit/+page.svelte';
  import { resolve } from '$app/paths';
  import { useExpensesStore } from '$lib/stores/expense/list.svelte';

  let errorMessage = $state('');

  const tripId = page.params.tripId;

  onMount(async () => {
    try {
      if (!tripId) {
        return;
      }

      await useExpensesStore.fetch(tripId);
      await useCreateExpenseStore.substituteFormData(tripId);
    } catch (e) {
      console.log(e);
    }
  });

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (!tripId) {
        return;
      }

      errorMessage = '';
      await useCreateExpenseStore.create(tripId);

      const resolved = resolve(`/${tripId}`);

      goto(resolved);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    }
  }
</script>

<svelte:head>
  <title>Add Expense</title>
  <meta name="description" content="Triptop - Add Expense" />
</svelte:head>

<div class="AddExpense">
  <Header backTo={`/${tripId}`} aria-label="Back to trips">Add Expense</Header>
  <EditExpense
    {onsubmit}
    onchange={editExpenseOnChange}
    {errorMessage}
    loading={useCreateExpenseStore.loading}
    formData={useCreateExpenseStore.formData}
    createNew
  />
</div>
