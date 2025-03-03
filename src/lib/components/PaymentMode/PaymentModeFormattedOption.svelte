<script lang="ts">
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import { PaymentModes, type PaymentModeOption } from '$lib/stores/payment-mode/types';
  import Icon from '@iconify/svelte';

  interface PaymentModeFormattedOptionProps {
    paymentMode?: PaymentModes;
    hideLogo?: boolean;
    hideLabel?: boolean;
  }

  const {
    paymentMode,
    hideLogo = false,
    hideLabel = false,
  }: PaymentModeFormattedOptionProps = $props();

  const option = $derived(
    paymentModeOptions.find((item) => item.value === paymentMode) || paymentModeOptions[0],
  );
</script>

{#snippet logo(option: PaymentModeOption)}
  <div class="Logo">
    {#if option.value === PaymentModes.CARD}
      <Icon icon="f7:creditcard-fill" />
    {:else}
      <Icon icon="material-symbols:money-bag" />
    {/if}
  </div>
{/snippet}

<div class="PaymentModeFormattedOption" data-value={option.value}>
  {#if !hideLogo}
    {@render logo(option)}
  {/if}

  {#if !hideLabel}
    {option.label}
  {/if}
</div>

<style lang="scss">
  .PaymentModeFormattedOption {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .Logo {
    background-color: var(--color-primary-200);
    color: var(--color-grey-font-700);
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.35rem;
    margin-right: 8px;
  }
</style>
