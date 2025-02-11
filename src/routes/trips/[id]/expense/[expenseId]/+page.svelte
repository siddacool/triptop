<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { categoryOptions, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const tripId = page.params.id;
  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
  const targetBudget = $derived(
    useBudgetStore.data.find((item) => item._id === targetExpense?.budgetId),
  );

  const paymentModeRaw = $derived(
    targetBudget ? targetBudget.paymentMode : targetExpense?.paymentMode,
  );

  const paymentModeValue = $derived(
    paymentModeOptions.find((item) => item.value === paymentModeRaw)?.label ||
      paymentModeOptions[0]?.label,
  );
</script>

{#if mounted && targetExpense}
  <h2>
    {targetExpense.name}
    <AnchorButton href={`/trips/${tripId}/expense/${id}/edit`} variant="primary" compact>
      <Icon icon="material-symbols:edit" />
    </AnchorButton>
  </h2>

  <div class="TripStats">
    <Card>
      <ul>
        <li>
          <div class="StatsLabel">Amount</div>
          <div class="StatsValue">
            <FormattedCurrency value={targetExpense.amount} />
          </div>
        </li>
        <li>
          <div class="StatsLabel">Category</div>
          <div class="StatsValue">
            {categoryOptions.find((item) => item.value === targetExpense?.category)?.logo || ''}
            {categoryOptions.find((item) => item.value === targetExpense?.category)?.label ||
              'Other'}
          </div>
        </li>
        <li>
          <div class="StatsLabel">Payment mode</div>
          <div class="StatsValue">
            {paymentModeValue}

            {#if targetBudget}
              ({targetBudget.name})
            {/if}
          </div>
        </li>
        <li>
          <div class="StatsLabel">Date and time</div>
          <div class="StatsValue">
            {getMoment(targetExpense.date).format('MMM,D YYYY')}
            {getMoment(targetExpense.date).format('hh:mm A')}
          </div>
        </li>
      </ul>
    </Card>
  </div>
{/if}

<style lang="scss">
  h2 {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .TripStats {
    ul {
      display: block;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      font-size: 1.05rem;
      border-bottom: 1px solid var(--color-grey-400);
      padding-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
        border-bottom: 0;
      }
    }

    :global(.Card) {
      padding: 0;
    }

    .StatsValue {
      font-weight: 600;
    }
  }
</style>
