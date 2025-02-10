<script lang="ts">
  import { page } from '$app/state';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import Card from '../ui-framework/Layout/Card.svelte';

  const tripId = page.params.id;
  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === tripId));
</script>

<div class="BudgetList">
  <h2>Budget</h2>
  <ul>
    {#each budgets as budget}
      <li>
        <a href={`/trips/${tripId}/budget/${budget._id}`}>
          <Card>
            <h2>{budget.name}</h2>
            <h2>₹{budget.amount}</h2>
            <h3>{budget.paymentMode}</h3>
          </Card>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .BudgetList {
    margin-top: 16px;
    ul {
      display: block;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      color: inherit;
    }

    :global(.Card) {
      &:hover {
        background-color: var(--color-primary-100);
      }
    }

    li {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
      margin-bottom: 10px;
    }

    .expenseValue {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      span {
        margin-bottom: 5px;
      }
    }
  }
</style>
