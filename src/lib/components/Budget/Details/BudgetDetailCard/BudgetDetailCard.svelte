<script lang="ts">
  import { page } from '$app/state';
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import AmountDisplay from '$lib/components/ui-framework/FormattedInfo/AmountDisplay.svelte';
  import AmountProgress from '$lib/components/ui-framework/FormattedInfo/AmountProgress.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { getExpenseUsedBudget } from '$lib/stores/expense/expense.svelte';
  import CardSection from './CardSection.svelte';

  const budgetId = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === budgetId));
  const usedAmount = $derived(getExpenseUsedBudget(targetBudget?._id || '') || 0);
</script>

<StackItem>
  <div class="BudgetDetailCard">
    <Card>
      <CardSection>
        <h2>
          {targetBudget?.name}
        </h2>
      </CardSection>
      <hr />
      <CardSection label="Amount">
        <AmountDisplay currency={targetBudget?.currency} value={targetBudget?.amount || 0} />
      </CardSection>
      <CardSection label="Stats">
        <AmountProgress
          currency={targetBudget?.currency}
          total={targetBudget?.amount || 0}
          {usedAmount}
        />
      </CardSection>
      <hr />
      <CardSection label="Payment Mode">
        <PaymentModeFormattedOption paymentMode={targetBudget?.paymentMode} />
      </CardSection>
    </Card>
  </div>
</StackItem>

<style lang="scss">
  .BudgetDetailCard {
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
