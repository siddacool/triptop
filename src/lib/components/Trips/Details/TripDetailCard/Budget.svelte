<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getCurrencyWiseBudgetForTrip } from '$lib/stores/budget/budget.svelte';
  import { getCurrencyCodeFromAlphabeticCode } from '$lib/stores/currency/currency-codes';

  const tripId = page.params.tripId;

  const budgets = $derived(getCurrencyWiseBudgetForTrip(tripId));
</script>

<div class="Budget">
  <Stack space={2}>
    <StackItem>
      <h3>Budget</h3>
      <ul>
        {#each budgets as budget}
          <li>
            <article>
              {getCurrencyCodeFromAlphabeticCode(budget.currency)?.alphabeticCode}
              <section>
                <a href={`/${tripId}/budget`} class="budget-details">
                  <FormattedCurrency
                    value={budget.total - budget.budgetUsed}
                    currency={budget.currency}
                    class="remaining"
                  /> /
                  <FormattedCurrency
                    value={budget.total}
                    currency={budget.currency}
                    class="total"
                  />
                </a>
              </section>
            </article>
          </li>
        {/each}
      </ul>
    </StackItem>
    <StackItem>
      <div class="addBudgetButtonSection">
        <AnchorButton href={`/${tripId}/budget/add`} variant="primary">Add budget</AnchorButton>
      </div>
    </StackItem>
  </Stack>
</div>

<style lang="scss">
  .Budget {
    padding: 16px;

    h3 {
      margin: 0;
      margin-bottom: 8px;
      font-size: 0.85rem;
      font-weight: 500;
    }

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
      margin-bottom: 8px;
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
          color: var(--color-danger-800);
        }

        :global(.total) {
          color: var(--color-primary-800);
        }
      }
    }

    .addBudgetButtonSection {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
