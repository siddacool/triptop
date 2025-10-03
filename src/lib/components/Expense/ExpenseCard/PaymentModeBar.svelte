<script lang="ts">
  import { PaymentModes } from '$lib/stores/expense/individual.svelte';

  interface PaymentModeBarProps {
    paymentMode?: PaymentModes;
  }

  const { paymentMode }: PaymentModeBarProps = $props();
</script>

<div
  class={['PaymentModeBar', paymentMode === PaymentModes.CARD ? 'CARD' : 'CASH'].join(' ')}
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

    &.CARD {
      background-color: var(--triptop-color-payment-mode-card-bar);
    }

    &.CASH {
      background-color: var(--triptop-color-payment-mode-cash-bar);
    }
  }
</style>
