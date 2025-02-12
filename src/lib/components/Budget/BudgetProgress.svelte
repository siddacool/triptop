<script lang="ts">
  import { calculatePercentage } from '$lib/helpers/percentage';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import FormattedCurrency from '../FormattedCurrency.svelte';
  import ProgressBar from '../ui-framework/FormattedInfo/ProgressBar.svelte';

  interface Props {
    budgetId: string;
    expenseToSkipId?: string;
    artificalAmount?: number;
  }

  const { budgetId, expenseToSkipId, artificalAmount = 0 }: Props = $props();

  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === budgetId));

  const expenses = $derived(
    useExpenseStore.data.filter((item) => {
      if (expenseToSkipId) {
        if (item._id === expenseToSkipId) {
          return false;
        }
      }

      return item.budgetId === targetBudget?._id;
    }),
  );

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0) +
      artificalAmount,
  );

  const diff = $derived(calculatePercentage(totalExpenses, targetBudget?.amount || 0));

  const remainingBudget = $derived(targetBudget ? targetBudget?.amount - totalExpenses : 0);
</script>

<div class="BudgetProgress">
  <FormattedCurrency value={totalExpenses || 0} />
  <ProgressBar fill={diff} />
  <section>
    <FormattedCurrency value={remainingBudget || 0} class="remainingBudget" />
    <FormattedCurrency value={targetBudget?.amount || 0} />
  </section>
</div>

<style lang="scss">
  .BudgetProgress {
    margin-top: 14px;
    margin-bottom: 14px;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 100%;

    :global(.ProgressBar) {
      margin: 0 8px;
      flex: 1;
    }

    section {
      display: flex;
      flex-direction: column;
      color: var(--color-primary-800);

      :global(.remainingBudget) {
        color: var(--color-danger-800);
        margin-bottom: 6px;
      }
    }
  }
</style>
