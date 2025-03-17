<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ExpesnseEditForm from '$lib/components/Expense/Edit/ExpesnseEditForm/ExpesnseEditForm.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { ExpenseFormData } from '$lib/stores/expense/types';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';

  const tripId = page.params.tripId;
  const name = $derived(useTripByIdStore.data?.name || '');

  async function onSave(data: ExpenseFormData, clickedButton?: HTMLButtonElement) {
    try {
      await useExpenseStore.add(tripId, data);

      if (clickedButton?.name === 'save-and-add-new') {
        console.log('Add new');
      } else {
        goto(`/${tripId}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Add expense: {name}</title>

<PageHeader title={`Add expense: ${name}`} backTo={`/${tripId}`} />

<Stack space={4}>
  <ExpesnseEditForm {onSave} />
</Stack>
