<script lang="ts">
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { getMoment } from '$lib/helpers/time';
  import type { Expense } from '$lib/stores/expense/types';
  import { page } from '$app/state';
  import DecoratedCard from '$lib/components/DecoratedCard.svelte';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();

  const id = page.params.id;
</script>

<li class="StyledCard">
  <a href={`/${id}/expense/${expense._id}`}>
    <DecoratedCard>
      <div class="expenseLabel">
        {expense.name}
      </div>
      <div class="expenseValue">
        <span>
          <b><FormattedCurrency value={expense.amount} /></b>
        </span>
        <span class="timevalue">
          {getMoment(expense.date).format('MMM,D')}
          {getMoment(expense.date).format('hh:mm A')}
        </span>
      </div>
    </DecoratedCard>
  </a>
</li>

<style lang="scss">
  .StyledCard {
    :global(.Card) {
      display: flex;
      justify-content: space-between;
      border-color: transparent;
      background-color: var(--color-primary-100);

      &:hover {
        background-color: var(--color-primary-200);
      }
    }

    .timevalue {
      font-size: 0.9rem;
      margin-top: 6px;
      opacity: 0.9;
    }

    .expenseLabel {
      font-weight: 500;
      font-size: 1.1rem;
    }

    .expenseValue {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      span {
        margin-bottom: 5px;
      }
    }
  }
</style>
