<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import PaymentChip from '$lib/components/PaymentChip.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import type { Budget } from '$lib/stores/budget/types';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import BudgetProgress from '../BudgetProgress.svelte';

  type Props = {
    budget: Budget;
  };

  const tripId = page.params.id;

  const { budget }: Props = $props();

  const isAnyExpense = $derived(useExpenseStore.data.some((item) => item.budgetId === budget._id));
</script>

<li>
  <a href={`/trips/${tripId}/budget/${budget._id}`}>
    <Card>
      <h2>{budget.name} <PaymentChip paymentMode={budget.paymentMode} /></h2>
      <h2>
        <FormattedCurrency value={budget.amount} />
      </h2>

      {#if isAnyExpense}
        <BudgetProgress budgetId={budget._id} />
      {/if}
    </Card>
  </a>
</li>

<style lang="scss">
  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;

    :global(.Chip) {
      margin-left: 8px;
    }
  }

  li {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    margin-bottom: 10px;

    :global(.Card) {
      &:hover {
        background-color: var(--color-primary-100);
      }
    }

    a {
      text-decoration: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      color: inherit;
    }
  }
</style>
