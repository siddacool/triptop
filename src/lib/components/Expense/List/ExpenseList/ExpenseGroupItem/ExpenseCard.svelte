<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import type { Expense } from '$lib/stores/expense/types';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
  const tripId = page.params.tripId;
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
              <FormattedCurrency value={expense.amount} currency={expense.currency} />
            </section>
          </article>
        </StackItem>
        <StackItem>
          <article>
            <section>
              <div class="paymentMode">
                {paymentModeOptions.find((item) => item.value === expense.paymentMode)?.label ||
                  paymentModeOptions[0].label}
              </div>
            </section>
            <section>
              <div class="date">
                {getMoment(expense.date).format('h:mm A, MMM D')}
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

    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: initial;
      color: inherit;

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
    }

    .paymentMode {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
</style>
