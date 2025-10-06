<script lang="ts">
  import { PaymentModes, type Expense } from '$lib/stores/expense/individual.svelte';
  import { getContext } from 'svelte';

  const data = getContext<Expense>('ExpenseData');
  const details = getContext<boolean | undefined>('details') || false;
</script>

<div
  class={['PaymentModeBar', data.paymentMode === PaymentModes.CARD ? 'CARD' : 'CASH'].join(' ')}
  class:details
></div>

<style lang="scss">
  .PaymentModeBar {
    height: 2px;
    border-radius: 8px;
    opacity: 0.8;
    position: absolute;
    right: 0;
    width: 130px;
    bottom: 0;

    &.details {
      width: 100%;
      right: initial;
      left: 0;
    }

    &.CARD {
      background-color: var(--triptop-color-payment-mode-card-bar);
    }

    &.CASH {
      background-color: var(--triptop-color-payment-mode-cash-bar);
    }
  }
</style>
