<script lang="ts">
  import { page } from '$app/state';
  import { getMoment } from '$lib/helpers/time';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import type { Dayjs } from 'dayjs';
  import FormattedCurrency from '../../FormattedCurrency.svelte';
  import Card from '../../ui-framework/Layout/Card.svelte';

  const groupExpensesByDateArray = (expenses: Expense[]) => {
    const grouped = expenses.reduce(
      (acc, expense) => {
        const formattedDate = getMoment(expense.date).format('YYYY-MM-DD'); // Format: DD/MM/YYYY

        if (!acc[formattedDate]) {
          acc[formattedDate] = {
            date: formattedDate,
            dateObject: getMoment(expense.date),
            expenses: [],
          };
        }

        acc[formattedDate].expenses.push(expense);
        return acc;
      },
      {} as Record<string, { date: string; dateObject: Dayjs; expenses: Expense[] }>,
    );

    return Object.values(grouped); // Convert object to array
  };

  const id = page.params.id;
  const targetExpense = $derived(useExpenseStore.data.filter((item) => item.tripId === id));
  const targetExpenseDateGroup = $derived(groupExpensesByDateArray(targetExpense));
</script>

<div class="ExpenseList">
  <ul>
    {#each targetExpenseDateGroup as dateGroup}
      <br />
      <li>
        <section>
          {dateGroup.dateObject.format('MMM, DD')}
        </section>
        <ul>
          {#each dateGroup.expenses as expense}
            <li>
              <a href={`/trips/${id}/expense/${expense._id}`}>
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
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .ExpenseList {
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
      margin-bottom: 10px;
      flex-wrap: wrap;
      width: 100%;
    }

    section {
      width: 100%;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 12px;
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
  }
</style>
