<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import CategoryList from '$lib/components/Statistics/CategoryList';
  import PaymentModeList from '$lib/components/Statistics/PaymentModeList';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const fetching = $derived(
    useTripsStore.fetching || useBudgetStore.fetching || useExpenseStore.fetching ? true : false,
  );

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));

  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === id));

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<title>{targetTrip?.name}: Stats</title>

{#if mounted && targetTrip}
  <h2>{targetTrip?.name}: Stats</h2>
  <p>Total Expense: <FormattedCurrency value={totalExpenses} /></p>

  <table>
    <tbody>
      <CategoryList />
      <PaymentModeList />
    </tbody>
  </table>
{/if}

{#if fetching}
  <p>Loading...</p>
{/if}

<style lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;

    :global(tr) {
      font-size: 0.95rem;
      font-weight: 500;

      &:hover {
        background-color: var(--color-primary-100);
      }
    }

    :global(tr.header) {
      font-weight: 600;
      font-size: 1.2rem;

      &:hover {
        background-color: transparent;
      }
    }

    :global(.logo) {
      margin-right: 4px;
    }

    :global(td) {
      padding: 8px 5px;
      border-bottom: 1px solid var(--color-grey-400);
      vertical-align: baseline;
      position: relative;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }

    :global(.progress) {
      display: flex;
      width: 100%;
      min-width: 100px;
    }

    :global(.progress .percent) {
      font-size: 0.85rem;
      position: absolute;
      top: 5px;
      font-weight: 500;
    }

    :global(.ProgressBar) {
      margin-top: 8px;
      margin-bottom: 8px;
      width: 100%;
      position: relative;
      top: 7px;
      height: 4px;
    }
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
  }
</style>
