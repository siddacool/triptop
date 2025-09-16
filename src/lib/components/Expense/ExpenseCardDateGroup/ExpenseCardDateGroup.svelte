<script lang="ts">
  import type { DateWiseExpense } from '$lib/stores/expense/list.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import ExpenseCard from '../ExpenseCard';
  import DateDisplay from './DateDisplay.svelte';

  interface ExpenseCardDateGroupProps {
    data: DateWiseExpense;
  }

  const { data }: ExpenseCardDateGroupProps = $props();
</script>

<div class="ExpenseCardDateGroup">
  <DateDisplay data={data.date} />
  <ul>
    {#each data.expenses as expense (expense._id)}
      <li>
        <ExpenseCard data={expense} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .ExpenseCardDateGroup {
    ul {
      margin: 0;
      padding: 0;
      display: block;
    }

    li {
      margin: 0;
      padding: 0;
      display: block;

      &:not(&:last-child) {
        margin-bottom: 4px;
      }
    }
  }
</style>
