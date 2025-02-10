<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const tripId = page.params.id;
  const id = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === id));
</script>

{#if mounted && targetBudget}
  <h2>
    {targetBudget.name}
    <AnchorButton href={`/trips/${tripId}/budget/${id}/edit`} variant="primary" compact>
      <Icon icon="material-symbols:edit" />
    </AnchorButton>
  </h2>

  <div class="TripStats">
    <Card>
      <ul>
        <li>
          <div class="StatsLabel">Amount</div>
          <div class="StatsValue">
            {targetBudget.amount}
          </div>
        </li>
        <li>
          <div class="StatsLabel">Payment mode</div>
          <div class="StatsValue">
            {targetBudget?.paymentMode}
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
