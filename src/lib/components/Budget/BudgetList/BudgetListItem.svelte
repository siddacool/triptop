<script lang="ts">
  import { page } from '$app/state';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import type { Budget } from '$lib/stores/budget/types';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  type Props = {
    budget: Budget;
  };

  const tripId = page.params.id;

  const { budget }: Props = $props();

  const targetExpenses = $derived(
    useExpenseStore.data.filter((item) => item.budgetId === budget._id),
  );

  const totalExpenses = $derived(
    targetExpenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<li>
  <a href={`/trips/${tripId}/budget/${budget._id}`}>
    <Card>
      <h2>{budget.name}</h2>
      <h2>
        ₹{budget.amount}
      </h2>
      {#if totalExpenses}
        <b>
          Used: ₹{totalExpenses}, Remaining: ₹{budget.amount - totalExpenses}
        </b>
      {/if}
      <h3>{budget.paymentMode}</h3>
    </Card>
  </a>
</li>

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  b {
    font-size: 1rem;
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
