<script lang="ts">
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
  const paymentMode = $derived(
    useBudgetStore.data.find((item) => item._id === expense.budgetId)?.paymentMode ||
      expense.paymentMode,
  );
</script>

<div class="DateSection">
  <PaymentModeFormattedOption {paymentMode} hideLabel />
  <div class="date">
    <Icon icon="tabler:clock" class="Icon" />
    {getMoment(expense.date).format('h:mm A')}
  </div>
</div>

<style lang="scss">
  .DateSection {
    display: flex;
    align-items: center;
    font-weight: 500;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;

    :global(.Logo) {
      width: 24px;
      height: 24px;
      font-size: 1.1rem;
    }

    .date {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--color-grey-font-500);

      :global(.Icon) {
        margin-right: 4px;
      }
    }
  }
</style>
