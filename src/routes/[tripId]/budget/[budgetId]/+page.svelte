<script lang="ts">
  import { page } from '$app/state';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import BudgetDetailCard from '$lib/components/Budget/Details/BudgetDetailCard/BudgetDetailCard.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;
  const budgetId = page.params.budgetId;

  const name = $derived(useBudgetStore.data.find((item) => item._id === budgetId)?.name || '');
</script>

<title>{name}</title>

<PageHeader title="Budget details" backTo={`/${tripId}/budget`}>
  <AnchorButton compact href={`/${tripId}/budget/${budgetId}/edit`} ariaLabel="Edit Budget">
    <Icon icon="material-symbols:edit" />
  </AnchorButton>
</PageHeader>

<Stack space={4}>
  <BudgetDetailCard />
</Stack>

<style lang="scss">
</style>
