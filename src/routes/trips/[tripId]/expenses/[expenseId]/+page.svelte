<script lang="ts">
  import ExpenseCardDetailed from '$lib/components/Expenses/ExpenseCardDetailed/ExpenseCardDetailed.svelte';
  import ExpenseHeader from '$lib/components/Expenses/ExpensePage/ExpenseHeader/ExpenseHeader.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
</script>

{#if useExpenseStore.expense && useTripStore.trip}
  <ExpenseHeader />
  <ExpenseCardDetailed
    expense={useExpenseStore.expense}
    trip={useTripStore.trip}
    class="ExpensesDetailsCard"
  />
{:else}
  --
{/if}

<style lang="scss">
  :global(.ExpensesDetailsCard) {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
