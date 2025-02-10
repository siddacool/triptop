<script lang="ts">
  import { page } from '$app/state';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  const id = page.params.id;
  const targetExpense = $derived(useExpenseStore.data.filter((item) => item.tripId === id));
</script>

<div class="ExpenseList">
  <ul>
    {#each targetExpense as expense}
      <li>
        <a href={`/trips/${id}/expense/${expense._id}`}>
          <div class="expenseLabel">{expense.name}</div>
          <div class="expenseValue">{expense.amount}</div>
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
    }

    li {
      margin: 0;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
      border-bottom: 1px solid var(--color-grey-400);
      padding-bottom: 8px;
    }
  }
</style>
