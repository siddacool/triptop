<script lang="ts">
  import { calculatePercentage } from '$lib/helpers/percentage';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import FormattedCurrency from '../FormattedCurrency.svelte';
  import ProgressBar from '../ui-framework/FormattedInfo/ProgressBar.svelte';

  interface Props {
    budgetId: string;
  }

  const { budgetId }: Props = $props();

  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === budgetId));

  const expenses = $derived(
    useExpenseStore.data.filter((item) => item.budgetId === targetBudget?._id),
  );

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );

  const diff = $derived(calculatePercentage(totalExpenses, targetBudget?.amount || 0));

  const remainingBudget = $derived(targetBudget ? targetBudget?.amount - totalExpenses : 0);
</script>

<div class="BudgetProgress">
  <FormattedCurrency value={totalExpenses} />
  <ProgressBar fill={diff} />
  <FormattedCurrency value={remainingBudget} />/
  <FormattedCurrency value={targetBudget?.amount || 0} />
</div>

<style lang="scss">
  .BudgetProgress {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;

    :global(.Progress) {
      margin: 0 8px;
    }
  }
</style>
