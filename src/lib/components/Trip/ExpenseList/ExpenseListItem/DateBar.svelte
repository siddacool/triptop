<script lang="ts">
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { page } from '$app/state';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { DateGroup } from '../ExpenseListItem.svelte';

  interface Props {
    dateGroup: DateGroup;
  }

  const { dateGroup }: Props = $props();

  const id = page.params.id;

  const date = $derived(dateGroup.dateObject.format('YYYY-MM-DD'));

  const targetExpenses = $derived(
    useExpenseStore.data.filter(
      (item) => item.tripId === id && getMoment(item.date).format('YYYY-MM-DD') === date,
    ),
  );

  const totalBudgetExpenses = $derived(
    targetExpenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<div class="DateBar">
  <div class="date">
    {dateGroup.dateObject.format('MMM, DD')}
  </div>
  <div class="amount">
    <FormattedCurrency value={totalBudgetExpenses} />
  </div>
</div>

<style lang="scss">
  .DateBar {
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .amount {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
</style>
