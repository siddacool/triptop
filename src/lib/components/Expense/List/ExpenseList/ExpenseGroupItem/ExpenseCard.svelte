<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import { PaymentModes } from '$lib/stores/payment-mode/types';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
  const tripId = page.params.tripId;
  const currency = $derived(
    useBudgetStore.data.find((item) => item._id === expense.budgetId)?.currency || expense.currency,
  );
  const paymentMode = $derived(
    useBudgetStore.data.find((item) => item._id === expense.budgetId)?.paymentMode ||
      expense.paymentMode,
  );
</script>

<li class="ExpenseCard">
  <a href={`/${tripId}/${expense._id}`}>
    <Card>
      <Stack space={1}>
        <StackItem>
          <article>
            <section>
              {expense.name}
            </section>
            <section>
              <FormattedCurrency value={expense.amount} {currency} />
            </section>
          </article>
        </StackItem>
        <StackItem>
          <article>
            <section>
              <div class="stats">
                {paymentMode === PaymentModes.CARD ? '💳' : '💵'}
                {categoryOptions.find((item) => item.value === expense.category)?.logo}
              </div>
            </section>
            <section>
              <div class="date">
                {getMoment(expense.date).format('h:mm a')}
              </div>
            </section>
          </article>
        </StackItem>
      </Stack>
    </Card>
  </a>
</li>

<style lang="scss">
  li {
    display: block;
    margin: 0;
    padding: 0;

    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: initial;
      color: inherit;

      :global(.Card) {
        padding: 16px 16px;
      }

      &:hover {
        :global(.Card) {
          background-color: var(--color-primary-50);
        }
      }

      &:active {
        :global(.Card) {
          background-color: var(--color-primary-100);
        }
      }
    }

    article {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;

      :global(.FormattedCurrency) {
        font-weight: 500;
      }
    }

    .date {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--color-grey-font-500);
    }

    .stats {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--color-grey-font-500);
    }

    :global(.AmountDisplay .FormattedCurrency) {
      font-weight: 400;
    }

    :global(.AmountDisplay section) {
      text-align: right;
    }
  }
</style>
