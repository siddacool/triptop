<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { getCurrencyCodeFromAlphabeticCode } from '$lib/stores/currency/currency-codes';
  import { getCurrencyWiseExpenseForTrip } from '$lib/stores/expense/expense.svelte';

  const tripId = page.params.tripId;

  const expenses = $derived(getCurrencyWiseExpenseForTrip(tripId));
</script>

<div class="TotalExpense">
  <h3>Total Expense</h3>
  <ul>
    {#each expenses as expense}
      <li>
        <article>
          <section>{getCurrencyCodeFromAlphabeticCode(expense.currency)?.alphabeticCode}</section>
          <section>
            <FormattedCurrency value={expense.total} currency={expense.currency} />
          </section>
        </article>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .TotalExpense {
    padding: 16px;
    padding-top: 8px;
    padding-bottom: 0;

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
      font-weight: 600;
      font-size: 0.85rem;

      &:last-child {
        margin-bottom: 0;
      }

      section {
        &:last-child {
          font-size: 1.5rem;
          font-weight: 400;
        }
      }
    }
  }
</style>
