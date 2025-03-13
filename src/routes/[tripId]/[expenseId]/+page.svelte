<script lang="ts">
  import { page } from '$app/state';
  import ExpenseDetailCard from '$lib/components/Expense/Details/ExpenseDetailCard/ExpenseDetailCard.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import Icon from '@iconify/svelte';

  const expenseId = page.params.expenseId;
  const tripId = page.params.tripId;

  const name = $derived(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');
</script>

<title>{name}</title>

<PageHeader title="Expense details" backTo={`/${tripId}`}>
  <AnchorButton compact href={`/${tripId}/${expenseId}/edit`} ariaLabel="Edit Expense">
    <Icon icon="material-symbols:edit" />
  </AnchorButton>
</PageHeader>

<Stack space={4}>
  <ExpenseDetailCard />
</Stack>

<style lang="scss">
</style>
