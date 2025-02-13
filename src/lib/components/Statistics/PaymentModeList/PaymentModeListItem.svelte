<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import ProgressBar from '$lib/components/ui-framework/FormattedInfo/ProgressBar.svelte';
  import { calculatePercentage } from '$lib/helpers/percentage';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { PaymentModeOption } from '$lib/stores/payment-mode/types';

  interface Props {
    paymentMode: PaymentModeOption;
    totalExpenses: number;
  }

  const tripId = page.params.id;

  const { paymentMode, totalExpenses }: Props = $props();

  const targetExpenses = $derived(
    useExpenseStore.data.filter(
      (item) => item.paymentMode === paymentMode.value && item.tripId === tripId,
    ),
  );

  const totalBudgetExpenses = $derived(
    targetExpenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );

  const diff = $derived(calculatePercentage(totalBudgetExpenses, totalExpenses));
</script>

<tr>
  <td>
    <span>{paymentMode.label}</span>

    {#if diff}
      <div class="progress">
        <span>{parseInt(`${diff}`, 10)}%</span>
        <ProgressBar fill={diff} />
      </div>
    {/if}
  </td>

  <td>
    <FormattedCurrency value={totalBudgetExpenses} />
  </td>
</tr>

<style lang="scss">
  tr {
    font-size: 1.1rem;

    td {
      padding: 10px;
      border-bottom: 1px solid var(--color-grey-400);
    }

    &:hover {
      background-color: var(--color-primary-100);
    }
  }
</style>
