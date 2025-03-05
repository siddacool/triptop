<script lang="ts">
  import { page } from '$app/state';
  import CategoryFormattedOption from '$lib/components/Expense/CategoryFormattedOption.svelte';
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

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
      <Stack space={2}>
        <StackItem>
          <article>
            <section class="name-section">
              <CategoryFormattedOption category={expense.category} hideLabel />
              {expense.name}
            </section>
            <section class="amount-section">
              <FormattedCurrency value={expense.amount} {currency} />
              <PaymentModeFormattedOption {paymentMode} hideLabel />
            </section>
          </article>
        </StackItem>
        <StackItem>
          <article class="secondary">
            <section></section>
            <section>
              <div class="date">
                <Icon icon="tabler:clock" class="Icon" />
                {getMoment(expense.date).format('h:mm A')}
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

      section {
        display: flex;
        align-items: center;
      }

      :global(.Logo) {
        width: 30px;
        height: 30px;
        font-size: 1.2rem;
        margin-right: 8px;
      }

      .amount-section {
        :global(.Logo) {
          margin-right: 0;
          margin-left: 8px;
        }
      }

      :global(.FormattedCurrency) {
        font-weight: 500;
      }

      &.secondary {
        align-items: flex-end;
      }
    }

    .date {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--color-grey-font-500);
      display: flex;
      align-items: center;

      :global(.Icon) {
        margin-right: 4px;
      }
    }

    :global(.AmountDisplay .FormattedCurrency) {
      font-weight: 400;
    }

    :global(.AmountDisplay section) {
      text-align: right;
    }
  }
</style>
