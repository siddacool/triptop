<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ExpesnseEditForm from '$lib/components/Expense/Edit/ExpesnseEditForm/ExpesnseEditForm.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { ExpenseFormData } from '$lib/stores/expense/types';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;
  const name = $derived(useTripsStore.data.find((item) => item._id === tripId)?.name || '');

  async function onSave(data: ExpenseFormData) {
    try {
      await useExpenseStore.add(tripId, data);

      goto(`/${tripId}`);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Add expense: {name}</title>

<Stack space={4}>
  <StackItem>
    <h2>Add expense: {name}</h2>
  </StackItem>
  <ExpesnseEditForm {onSave} />
</Stack>

<style lang="scss">
  h2 {
    margin: 0;
    font-weight: 500;
  }
</style>
