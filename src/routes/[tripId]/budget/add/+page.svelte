<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import BudgetEditForm from '$lib/components/Budget/Edit/BudgetEditForm/BudgetEditForm.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { BudgetFormData } from '$lib/stores/budget/types';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';

  const tripId = page.params.tripId;
  const name = $derived(useTripByIdStore.data?.name || '');

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

<PageHeader title={`Add budget: ${name}`} backTo={`/${tripId}`} />

<Stack space={4}>
  <BudgetEditForm {onSave} />
</Stack>
