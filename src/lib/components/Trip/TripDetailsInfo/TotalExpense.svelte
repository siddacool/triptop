<script lang="ts">
  import { page } from '$app/state';
  import FormLabel from '$lib/components/ui-framework/Form/shared/FormLabel.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import FormattedCurrency from '../../FormattedCurrency.svelte';
  import AnchorButton from '../../ui-framework/Form/AnchorButton.svelte';

  const id = page.params.id;

  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === id));

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<li class="TotalExpense">
  <section>
    <FormLabel label="Total Expense" />
    <b><FormattedCurrency value={totalExpenses} /></b>
  </section>
  <section>
    <AnchorButton href={`/${id}/stats`}>Stats</AnchorButton>
  </section>
</li>

<style lang="scss">
  .TotalExpense {
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    font-size: 1.05rem;
    border-bottom: 1px solid var(--color-grey-400);
    padding-bottom: 16px;

    b {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
</style>
