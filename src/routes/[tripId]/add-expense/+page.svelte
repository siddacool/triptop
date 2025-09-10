<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/EditExpense/EditExpense.svelte';
  import Header from '$lib/components/Header.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateExpenseStore } from '$lib/stores/expense/create.svelte';
  import { onMount } from 'svelte';
  import { editExpenseOnChange } from '../[expenseId]/edit/+page.svelte';

  let errorMessage = $state('');

  const tripId = page.params.tripId;

  onMount(async () => {
    try {
      if (!tripId) {
        return;
      }

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

      goto(`/${tripId}`);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    }
  }
</script>

<div class="AddExpense">
  <EditExpense
    {onsubmit}
    onchange={editExpenseOnChange}
    {errorMessage}
    loading={useCreateExpenseStore.loading}
    formData={useCreateExpenseStore.formData}
    createNew
  >
    {#snippet header()}
      <Header backTo={`/${tripId}`} aria-label="Back to trips">Add Expense</Header>
    {/snippet}
  </EditExpense>
</div>
