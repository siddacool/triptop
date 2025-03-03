<script lang="ts">
  import { page } from '$app/state';
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import AmountDisplay from '$lib/components/ui-framework/FormattedInfo/AmountDisplay.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import CategoryFormattedOption from '../../CategoryFormattedOption.svelte';
  import CardSection from './CardSection.svelte';

  const expenseId = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === expenseId));
  const targetBudget = $derived(
    useBudgetStore.data.find((item) => item._id === targetExpense?.budgetId),
  );
  const currency = $derived(targetBudget?.currency || targetExpense?.currency);
  const paymentMode = $derived(targetBudget?.paymentMode || targetExpense?.paymentMode);
</script>

<StackItem>
  <div class="ExpenseDetailCard">
    <Card>
      <CardSection>
        <h2>
          {targetExpense?.name}
        </h2>
      </CardSection>
      <hr />
      <CardSection label="Amount">
        <AmountDisplay {currency} value={targetExpense?.amount || 0} />
      </CardSection>
      <CardSection label="Payment Mode">
        <PaymentModeFormattedOption {paymentMode} />
      </CardSection>

      <hr />
      <CardSection label="Category">
        <CategoryFormattedOption category={targetExpense?.category} />
      </CardSection>
      <hr />
      <CardSection label="Budget">{targetBudget?.name || 'Other'}</CardSection>
      <hr />
      <CardSection label="Time">
        {targetExpense?.date ? getMoment(targetExpense.date).format('h:mm a') : ''}
      </CardSection>
      <CardSection label="Date">
        {targetExpense?.date ? getMoment(targetExpense.date).format('ddd, MMM D, YYYY') : ''}
      </CardSection>
    </Card>
  </div>
</StackItem>

<style lang="scss">
  .ExpenseDetailCard {
    position: relative;

    :global(.Card) {
      padding-left: 0;
      padding-right: 0;
    }

    hr {
      border: 0;
      border-top: 1px solid var(--color-grey-500);
      margin-bottom: 4px;
    }

    h2 {
      margin: 0;
      font-weight: 500;
    }
  }
</style>
