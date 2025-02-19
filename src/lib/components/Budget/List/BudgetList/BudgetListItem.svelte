<script lang="ts">
  import { page } from '$app/state';
  import DecoratedCard from '$lib/components/DecoratedCard.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import PaymentChip from '$lib/components/PaymentChip.svelte';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import H3 from '$lib/components/ui-framework/Headings/H3.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import type { Budget } from '$lib/stores/budget/types';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import BudgetProgress from '../../BudgetProgress.svelte';

  type Props = {
    budget: Budget;
  };

  const tripId = page.params.id;

  const { budget }: Props = $props();

  const isAnyExpense = $derived(useExpenseStore.data.some((item) => item.budgetId === budget._id));
</script>

<DecoratedCard href={`/${tripId}/budget/${budget._id}`} active>
  <Stack space={2}>
    <StackItem>
      <div class="budget">
        <H2>
          {budget.name}
        </H2>
        <PaymentChip paymentMode={budget.paymentMode} />
      </div>
    </StackItem>
    <StackItem>
      <H3><FormattedCurrency value={budget.amount} /></H3>
    </StackItem>

    {#if isAnyExpense}
      <StackItem>
        <BudgetProgress budgetId={budget._id} />
      </StackItem>
    {/if}
  </Stack>
</DecoratedCard>

<style lang="scss">
  .budget {
    display: flex;
    align-items: center;

    :global(.Chip) {
      margin-left: 8px;
    }

    :global(.H2) {
      margin: 0;
    }
  }
</style>
