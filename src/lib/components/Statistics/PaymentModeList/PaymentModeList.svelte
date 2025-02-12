<script lang="ts">
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import PaymentModeListItem from './PaymentModeListItem.svelte';
</script>

<h2>Payment Mode</h2>

<table>
  {#each paymentModeOptions as paymentMode}
    <PaymentModeListItem {paymentMode} />
  {/each}
</table>

<style lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0;
    margin-top: 50px;
  }
</style>
