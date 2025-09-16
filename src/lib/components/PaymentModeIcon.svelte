<script lang="ts">
  import { PaymentModes } from '$lib/stores/expense/individual.svelte';
  import Icon from '@iconify/svelte';

  interface paymentModeIconProps {
    paymentMode?: PaymentModes;
  }

  const { paymentMode }: paymentModeIconProps = $props();
</script>

<span class="PaymentModeIcon">
  {#if paymentMode === PaymentModes.CARD}
    <Icon icon="ion:card" width="20" height="20" class="card" />
  {:else}
    <Icon icon="mdi:cash" width="24" height="24" class="cash" />
  {/if}
</span>

<style lang="scss">
  .PaymentModeIcon {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    :global(.card) {
      color: var(--dodo-color-warning-400);
    }

    :global(.cash) {
      color: var(--dodo-color-safe-400);
    }
  }
</style>
