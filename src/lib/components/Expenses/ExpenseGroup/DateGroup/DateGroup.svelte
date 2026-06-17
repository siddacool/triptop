<script lang="ts">
  import type { ExpensesDateGroup } from '$lib/stores/expense/getters/group-expenses';
  import { type Expense } from '$lib/stores/expense/types';
  import ExpenseCard from '../../ExpenseCard/ExpenseCard.svelte';
  import Date from './Date.svelte';

  type Props = {
    data: ExpensesDateGroup;
  };

  let { data }: Props = $props();
</script>

{#snippet expenses(data: Expense[])}
  {#each data as expense (expense._id)}
    <ExpenseCard {expense} />
  {/each}
{/snippet}

<li class="ExpenseDateGroup">
  <Date date={data.date} />

  <ul>
    {@render expenses(data.expenses)}
  </ul>
</li>

<style lang="scss">
  .ExpenseDateGroup {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;

    ul {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      margin-bottom: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
