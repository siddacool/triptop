<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/EditExpense.svelte';
  import Header from '$lib/components/Header.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateExpenseStore } from '$lib/stores/expense/create.svelte';

  let errorMessage = $state('');

  const tripId = page.params.tripId;

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (!tripId) {
        return;
      }

      errorMessage = '';
      await useCreateExpenseStore.create(tripId);

      goto('/');
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    }
  }

  function onchange(e: Event) {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    switch (name) {
      case 'name':
        useCreateExpenseStore.updateForm({ name: target.value });
        break;
      case 'amount':
        useCreateExpenseStore.updateForm({ amount: Number(target.value) });
        break;
      default:
        break;
    }
  }
</script>

<div class="AddExpense">
  <EditExpense
    {onsubmit}
    {onchange}
    {errorMessage}
    loading={useCreateExpenseStore.loading}
    formData={useCreateExpenseStore.formData}
    createNew
  >
    {#snippet header()}
      <Header backTo="/" aria-label="Back to trips">Add Expense</Header>
    {/snippet}
  </EditExpense>
</div>
