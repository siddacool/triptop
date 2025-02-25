<script lang="ts">
  import { page } from '$app/state';
  import ExpenseDetailCard from '$lib/components/Expense/Details/ExpenseDetailCard/ExpenseDetailCard.svelte';
  import Header from '$lib/components/Expense/Details/Header.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  const expenseId = page.params.expenseId;

  const name = $derived(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');
</script>

<title>{name}</title>

<Header />

<Stack space={4}>
  <ExpenseDetailCard />
</Stack>

<style lang="scss">
</style>
