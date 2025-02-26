<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import BudgetEditForm from '$lib/components/Budget/Edit/BudgetEditForm/BudgetEditForm.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { BudgetFormData } from '$lib/stores/budget/types';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;
  const name = $derived(useTripsStore.data.find((item) => item._id === tripId)?.name || '');

  async function onSave(data: BudgetFormData) {
    try {
      await useBudgetStore.add(tripId, data);

      goto(`/${tripId}/budget`);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Add budget: {name}</title>

<Stack space={4}>
  <StackItem>
    <h2>Add budget: {name}</h2>
  </StackItem>
  <BudgetEditForm {onSave} />
</Stack>

<style lang="scss">
  h2 {
    margin: 0;
    font-weight: 500;
  }
</style>
