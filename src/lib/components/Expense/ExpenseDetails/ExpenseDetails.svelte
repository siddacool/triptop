<script lang="ts">
  import { type Expense } from '$lib/stores/expense/individual.svelte';
  import ExpenseCard from '../ExpenseCard';

  interface ExpenseDetailsProps {
    data: Expense;
  }

  const { data }: ExpenseDetailsProps = $props();
</script>

<div class="ExpenseDetails">
  <ExpenseCard {data} details />
</div>

<style lang="scss">
  .ExpenseDetails {
    margin-top: 24px;
  }
</style>
