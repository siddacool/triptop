<script lang="ts">
  import { page } from '$app/state';
  import { getMoment } from '$lib/helpers/time';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import Card from '../ui-framework/Layout/Card.svelte';

  const id = page.params.id;
  const targetExpense = $derived(useExpenseStore.data.filter((item) => item.tripId === id));
</script>

<div class="ExpenseList">
  <ul>
    {#each targetExpense as expense}
      <li>
        <a href={`/trips/${id}/expense/${expense._id}`}>
          <Card>
            <div class="expenseLabel">
              {expense.name}
            </div>
            <div class="expenseValue">
              <span>
                <b>₹{expense.amount}</b>
              </span>
              <span>
                {getMoment(expense.date).format('MMM,D')}
                {getMoment(expense.date).format('hh:mm A')}
              </span>
            </div>
          </Card>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .ExpenseList {
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
      display: flex;
      justify-content: space-between;
      border-color: transparent;
      background-color: var(--color-grey-100);

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
