<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import RemainingAmount from '$lib/components/ui-framework/FormattedInfo/RemainingAmount.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getCurrencyWiseBudgetForTrip } from '$lib/stores/budget/budget.svelte';
  import { getCurrencyCodeFromAlphabeticCode } from '$lib/stores/currency/currency-codes';
  import Heading from './Heading.svelte';

  const tripId = page.params.tripId;

  const budgets = $derived(getCurrencyWiseBudgetForTrip(tripId));
</script>

<div class="Budget">
  <Stack space={2}>
    <StackItem>
      <Heading title="Budget" />
    </StackItem>

    {#if budgets.length}
      <StackItem>
        <ul>
          {#each budgets as budget (budget.currency)}
            <li>
              <article>
                {getCurrencyCodeFromAlphabeticCode(budget.currency)?.alphabeticCode}
                <section>
                  <a href={`/${tripId}/budget`} class="budget-details">
                    <RemainingAmount
                      usedAmount={budget.budgetUsed}
                      total={budget.total}
                      currency={budget.currency}
                    />
                  </a>
                </section>
              </article>
            </li>
          {/each}
        </ul>
      </StackItem>
    {/if}
    <StackItem>
      <div class="addBudgetButtonSection">
        <AnchorButton href={`/${tripId}/budget/add`} variant="primary">Add Budget</AnchorButton>
      </div>
    </StackItem>
  </Stack>
</div>

<style lang="scss">
  .Budget {
    padding: 16px 16px;
    padding-bottom: 32px;

    ul {
      margin: 0;
      padding: 0;
      display: block;
    }

    li {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      font-weight: 500;
      font-size: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      article {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
      }

      .budget-details {
        text-decoration: none;
        display: inline-block;
        :global(.remaining) {
          color: var(--color-primary-800);
        }

        :global(.total) {
          color: var(--color-grey-font-800);
        }
      }
    }

    .addBudgetButtonSection {
      display: flex;
      margin-top: 16px;
    }
  }
</style>
