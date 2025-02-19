<script lang="ts" module>
  export interface DateGroup {
    date: string;
    dateObject: Dayjs;
    expenses: Expense[];
  }
</script>

<script lang="ts">
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { getMoment } from '$lib/helpers/time';
  import type { Expense } from '$lib/stores/expense/types';
  import type { Dayjs } from 'dayjs';
  import { page } from '$app/state';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
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

<div class="ExpenseListItem">
  <section>
    <div class="date">
      {dateGroup.dateObject.format('MMM, DD')}
    </div>
    <div class="amount">
      <FormattedCurrency value={totalBudgetExpenses} />
    </div>
  </section>
  <ul>
    {#each dateGroup.expenses as expense}
      <li>
        <a href={`/${id}/expense/${expense._id}`}>
          <Card>
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
          </Card>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .ExpenseListItem {
    margin-top: 32px;

    &:first-child {
      margin-top: 0;
    }

    ul {
      display: block;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      color: inherit;
    }

    :global(.Card) {
      display: flex;
      justify-content: space-between;
      border-color: transparent;
      background-color: var(--color-primary-100);

      &:hover {
        background-color: var(--color-primary-200);
      }
    }

    li {
      margin: 0;
      padding: 0;
      display: block;
      justify-content: space-between;
      font-size: 1rem;
      margin-bottom: 16px;
      flex-wrap: wrap;
      width: 100%;
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

    .timevalue {
      font-size: 0.9rem;
      margin-top: 6px;
      opacity: 0.9;
    }

    section {
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
  }
</style>
