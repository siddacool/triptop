<script lang="ts">
  import ExpenseCardDetailed from '$lib/components/Expenses/ExpenseCardDetailed/ExpenseCardDetailed.svelte';
  import ExpenseHeader from '$lib/components/Expenses/ExpensePage/ExpenseHeader/ExpenseHeader.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
</script>

<svelte:head>
  <title>{useExpenseStore.expense?.name || ''}</title>
</svelte:head>

<WhiteMaterial>
  <Box>
    {#if useExpenseStore.fetching || useTripStore.fetching}
      <Loading />
    {:else if useExpenseStore.expense && useTripStore.trip}
      <ExpenseHeader />
      <ExpenseCardDetailed
        expense={useExpenseStore.expense}
        trip={useTripStore.trip}
        class="ExpensesDetailsCard"
      />
    {/if}
  </Box>
</WhiteMaterial>

<style lang="scss">
  :global(.ExpensesDetailsCard) {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
