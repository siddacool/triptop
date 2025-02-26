<script lang="ts">
  import { page } from '$app/state';
  import Header from '$lib/components/Budget/Details/Header.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import BudgetDetailCard from '$lib/components/Budget/Details/BudgetDetailCard/BudgetDetailCard.svelte';

  const budgetId = page.params.budgetId;

  const name = $derived(useBudgetStore.data.find((item) => item._id === budgetId)?.name || '');
</script>

<title>{name}</title>

<Header />

<Stack space={4}>
  <BudgetDetailCard />
</Stack>

<style lang="scss">
</style>
