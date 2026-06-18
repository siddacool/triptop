<script lang="ts">
  import { paymentModesOptions, type PaymentModes } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

  type Props = {
    value?: PaymentModes;
    class?: string;
  };

  const { class: className = '', value }: Props = $props();

  const classes = $derived(['PaymentModeIcon', className].filter(Boolean));
  const paymentMode = $derived(paymentModesOptions.find((item) => item.value === value));
</script>

{#if paymentMode?.meta?.icon?.name}
  <span class={classes.join(' ')}>
    <Icon icon={paymentMode.meta?.icon?.name} />
  </span>
{/if}

<style lang="scss">
  .PaymentModeIcon {
    margin-right: 4px;
    display: inline-flex;
    font-size: 1.24rem;
  }
</style>
