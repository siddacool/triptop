<script lang="ts">
  import type { PaymentModesOption } from '$lib/stores/expense/types';
  import PaymentModeIcon from '../PaymentModeIcon/PaymentModeIcon.svelte';

  type Props = {
    option?: PaymentModesOption;
  };

  let { option }: Props = $props();
</script>

{#if option}
  <div class="DecoratedOption">
    <PaymentModeIcon value={option.value} class="DecoratedOptionPaymentModeIcon" />
    {option.label}
  </div>
{/if}

<style lang="scss">
  .DecoratedOption {
    display: flex;
    align-items: center;

    :global(.DecoratedOptionPaymentModeIcon) {
      margin-right: 8px;
      font-size: 1.25rem;
    }
  }
</style>
