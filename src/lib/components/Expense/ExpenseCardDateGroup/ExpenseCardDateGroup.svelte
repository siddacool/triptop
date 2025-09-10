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
  <Grid spacing={1}>
    {#each data.expenses as expense (expense._id)}
      <Column><ExpenseCard data={expense} /></Column>
    {/each}
  </Grid>
</div>

<style lang="scss">
</style>
