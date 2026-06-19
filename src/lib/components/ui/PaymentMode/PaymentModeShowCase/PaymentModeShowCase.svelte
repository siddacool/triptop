<script lang="ts">
  import { paymentModesOptions } from '$lib/stores/payment-modes/data';

  import type { PaymentModes } from '$lib/stores/payment-modes/types';

  import PaymentModeIcon from '../PaymentModeIcon/PaymentModeIcon.svelte';

  type Props = {
    value?: PaymentModes;
    class?: string;
  };

  const { class: className = '', value }: Props = $props();

  const classes = $derived(['PaymentModesShowCase', className].filter(Boolean));
  const paymentMode = $derived(paymentModesOptions.find((item) => item.value === value));
</script>

{#if paymentMode}
  <div class={classes.join(' ')}>
    <PaymentModeIcon {value} />

    {paymentMode.label}
  </div>
{/if}

<style lang="scss">
  .PaymentModesShowCase {
    color: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
  }
</style>
